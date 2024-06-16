import React, { useEffect, useState } from 'react';
import {
  useToast,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Checkbox,
} from '@chakra-ui/react';
import Datepicker from '../Datepicker';
import BackendApi from '../../Services';
import handlePostResponse from '../ToastMessage/Toast';
import { SiValorant } from 'react-icons/si';


const PostWinModal = ({ isOpen, onClose }) => {
  const [valor, setValor] = useState()
  const [origem, setOrigem] = useState()
  const [recebida, setRecebida] = useState(false)
  const [data_recebimento, setDataRecebimento] = useState()
  const [recorrencia_id, setRecorrenciaId] = useState()
  const [tipos_recebimento, setTiposRecebimento] = useState()
  const toast = useToast();


  async function fetch_recurrency_types() {
    try {
      const response = await BackendApi.get(`/user/wins/type_win`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_token")}`
        }
      })
      setTiposRecebimento(response.data)
    } catch (error) {
      handlePostResponse(toast, false, "Algo deu errado", "tente novamente mais tarde")

    }

  }
  async function post_win() {
    const win_data = {

    }

    try {
      const response = await BackendApi.post(`/user/wins`,win_data,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_token")}`,
          "Content-Type": "application/json"
        }
      })
      handlePostResponse(toast, true, "Confirmado", `Recebimento de {} no valor de {valor} confirmada`)
    } catch (error) {
      handlePostResponse(toast, false, "Algo deu errado", "tente novamente mais tarde")

    }

  }

  useEffect(() => {
    fetch_recurrency_types();
  }, []);

  function handleDateRecebimento(date) {
    setDataRecebimento(date);
  }


  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Inserir Débitos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <FormLabel>
                Origem
                <Input onChange={(e) => setOrigem(e.target.value)} type="text" ></Input>
              </FormLabel>
            </Box>
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box></Box>
              <Box>
                <FormLabel>
                  Valor
                  <Input
                    type="number"
                    onChange={(e) => setValor(e.target.value)}
                  ></Input>
                </FormLabel>
              </Box>
              <Box>
                <Datepicker
                  label="Data de Recebimento"
                  onDateChange={handleDateRecebimento}
                ></Datepicker>
              </Box>
              <FormLabel>
                Recorrencia
                <Select
                  placeholder="Select option"
                  onChange={(e) => setRecorrenciaId(e.target.value)}
                >
                  {tipos_recebimento?.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.recorrencia}
                    </option>
                  ))}
                </Select>
                </FormLabel>
                <Box marginLeft={"0px"}>
                <Checkbox onChange={(e) => setRecebida(!recebida)}  size='md' colorScheme='green' >
                  Recebida?
                  </Checkbox>
                  </Box>

            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={post_win} colorScheme="orange" backgroundColor={"orange.500"} mr={3} >
              Criar
            </Button>
            <Button mr={3} onClick={() => onClose()}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostWinModal;