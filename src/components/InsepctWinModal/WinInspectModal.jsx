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
    Flex,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from '@chakra-ui/react';
import Datepicker from '../Datepicker';
import BackendApi from '../../Services';
import handlePostResponse from '../ToastMessage/Toast';



const WinInspectModal = ({ isOpen, onClose, modal_data }) => {
    const [valor, setValor] = useState(modal_data.valor)
    const [origem, setorigem] = useState(modal_data.origem)
    const [recebida, setRecebida] = useState(modal_data.recebida)
    const [data_recebidamento, setDatarecebidamento] = useState(modal_data.data_recebimento)
    const [win_id, setWinId] = useState(modal_data.id);
    const toast = useToast();

    function format_date(date_to_format) {
        if (!date_to_format) return null;
        const dateObject = new Date(date_to_format);

        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const year = dateObject.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }



    async function recieve() {
        try {
            const response = await BackendApi.post(`/user/wins/${win_id}`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
                    "Content-Type": "application/json"
                }
            })
            handlePostResponse(toast, true, "Confirmado", `Recebimento para ${origem} no valor de ${valor} concluido`)
        } catch (error) {
            if (error.code === "ERR_BAD_REQUEST") {
                handlePostResponse(toast, false, "Algo deu errado", "Recebimento já foi feito")
                return;
            }
            handlePostResponse(toast, false, "Algo deu errado", error.code)

        }

    }
    async function updateWin() {
        const updated_win_data = {
            valor: valor,
            origem: origem,
            recebida: recebida,
            data_recebidamento: data_recebidamento,
        }
        try {
            const response = await BackendApi.put(`/user/wins/${win_id}`, updated_win_data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
                    "Content-Type": "application/json"
                }
            })
            handlePostResponse(toast, true, "Confirmado", `Recebimento para ${origem} no valor de ${valor} atualizado`)
        } catch (error) {
            if (error.code === "ERR_BAD_REQUEST") {
                handlePostResponse(toast, false, "Algo deu errado", "Recebimento já foi feito")
                return;
            }
            handlePostResponse(toast, false, "Algo deu errado", error.code)

        }

    }
    function handleDaterecebidamento(date) {
        setDatarecebidamento(date);
    }

    function format_date(date_to_format) {
        if(!date_to_format) return null;
        const dateObject = new Date(date_to_format);
    
        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const year = dateObject.getFullYear();
    
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
      }




    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Recebidamento</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Tabs w={'100%'} isFitted variant="enclosed">
                            <TabList>
                                <Tab _selected={{ color: 'white', bg: '#676767' }} fontSize={'16px'}>recebidar</Tab>
                                <Tab _selected={{ color: 'white', bg: '#676767' }} fontSize={'16px'}>Editar </Tab>
                            </TabList>
                            <TabPanels >
                                <TabPanel>
                                    <Flex w={"100%"} flexDir={"column"} textAlign={"center"}>
                                        {recebida && <h1>Recebimento já foi feito!!</h1>}
                                        <Button colorScheme={recebida ? "gray" : 'green'} w={"100%"} onClick={recebida ? console.log("") : recieve}>Receber</Button>
                                    </Flex>
                                </TabPanel>
                                <TabPanel  >
                                    <Box>
                                        <FormLabel>
                                            origem
                                            <Input value={origem} onChange={(e) => setorigem(e.target.value)} type="text" ></Input>
                                        </FormLabel>
                                    </Box>
                                    <FormControl display="flex" flexDir="column" gap={4}>
                                        <Box></Box>
                                        <Box>
                                            <FormLabel>
                                                Valor
                                                <Input
                                                    type="number"
                                                    value={valor}
                                                    onChange={(e) => setValor(e.target.value)}
                                                ></Input>
                                            </FormLabel>
                                        </Box>
                                        <Box>
                                            <Datepicker
                                                label={`Data de recebidamento   atual: ${format_date(data_recebidamento)}`}
                                                default={data_recebidamento}
                                                onDateChange={handleDaterecebidamento}
                                            ></Datepicker>
                                        </Box>
                                        <Flex marginLeft={"0px"} flexDir={"row"} justifyContent={"space-between"}>
                                            <Box >
                                                <Checkbox onChange={(e) => setRecebida(!recebida)} isChecked={recebida} size='md' colorScheme='green' >
                                                    recebida?
                                                </Checkbox>
                                            </Box>
                                        </Flex>
                                        <Button onClick={updateWin} colorScheme="orange" backgroundColor={"orange.500"} mr={3} >
                                            Atualizar
                                        </Button>
                                        <Button mr={3} onClick={() => onClose()}>
                                            Cancelar
                                        </Button>
                                    </FormControl>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default WinInspectModal;