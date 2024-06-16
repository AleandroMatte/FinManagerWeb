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


const PostDebtModal = ({ isOpen, onClose }) => {
  const [valor, setValor] = useState()
  const [destino, setDestino] = useState()
  const [paga, setPaga] = useState(false)
  const [data_pagamento, setDataPagamento] = useState()
  const [recorrencia_id, setRecorrenciaId] = useState()
  const [tipos_divida, setTiposDivida] = useState()
  const toast = useToast();


  async function fetch_recurrency_types() {
    try {
      const response = await BackendApi.get(`/user/debt/type_debt`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_token")}`
        }
      })
      setTiposDivida(response.data)
    } catch (error) {
      handlePostResponse(toast, false, "Algo deu errado", "tente novamente mais tarde")

    }

  }
  async function post_debt() {
    const debt_data = {
      valor: valor,
      destino: destino,
      paga: paga,
      data_pagamento: `${data_pagamento}`,
      recorrencia_id: recorrencia_id
    }

    try {
      const response = await BackendApi.post(`/user/debt`,debt_data,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_token")}`,
          "Content-Type": "application/json"
        }
      })
      handlePostResponse(toast, true, "Confirmado", `Divida para ${destino} no valor de ${valor} confirmada`)
    } catch (error) {
      handlePostResponse(toast, false, "Algo deu errado", "tente novamente mais tarde")

    }

  }

  useEffect(() => {
    fetch_recurrency_types();
  }, []);

  function handleDatePagamento(date) {
    setDataPagamento(date);
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
                Destino
                <Input onChange={(e) => setDestino(e.target.value)} type="text" ></Input>
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
                  label="Data de Pagamento"
                  onDateChange={handleDatePagamento}
                ></Datepicker>
              </Box>
              <FormLabel>
                Recorrencia
                <Select
                  placeholder="Select option"
                  onChange={(e) => setRecorrenciaId(e.target.value)}
                >
                  {tipos_divida?.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.tipoDivida}
                    </option>
                  ))}
                </Select>
                </FormLabel>
                <Box marginLeft={"0px"}>
                <Checkbox onChange={(e) => setPaga(!paga)}  size='md' colorScheme='green' >
                  Paga?
                  </Checkbox>
                  </Box>

            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={post_debt} colorScheme="orange" backgroundColor={"orange.500"} mr={3} >
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

export default PostDebtModal;