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



const DebtInspectModal = ({ isOpen, onClose, modal_data }) => {
    const [valor, setValor] = useState(modal_data.valor)
    const [destino, setDestino] = useState(modal_data.destino)
    const [paga, setPaga] = useState(modal_data.paga)
    const [data_pagamento, setDataPagamento] = useState(modal_data.data_pagamento)
    const [updateRepetitions, setUpdateRepetitions] = useState(false)
    const [debt_id, setDebtId] = useState(modal_data.id);
    const toast = useToast();




    async function pay() {
        try {
            const response = await BackendApi.post(`/user/debt/${debt_id}`, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
                    "Content-Type": "application/json"
                }
            })
            handlePostResponse(toast, true, "Confirmado", `Divida para ${destino} no valor de ${valor} paga`)
        } catch (error) {
            if(error.code === "ERR_BAD_REQUEST"){
                handlePostResponse(toast, false, "Algo deu errado", "divida já foi paga")
                return;
            }
            handlePostResponse(toast, false, "Algo deu errado",error.code)

        }

    }
    function handleDatePagamento(date) {
        setDataPagamento(date);
    }




    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Pagamento</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Tabs w={'100%'} isFitted variant="enclosed">
                            <TabList>
                                <Tab _selected={{ color: 'white', bg: '#676767' }} fontSize={'16px'}>Pagar</Tab>
                                <Tab _selected={{ color: 'white', bg: '#676767' }} fontSize={'16px'}>Editar </Tab>
                            </TabList>
                            <TabPanels >
                                <TabPanel>
                                <Flex w={"100%"} flexDir={"column"} textAlign={"center"}>
                                    {paga && <h1>Divida já está paga!!</h1>}
                                <Button colorScheme={paga?"gray":'green'} w={"100%"}  onClick={paga?console.log(""):pay}>Pagar</Button>
                                </Flex>
                                </TabPanel>
                                <TabPanel  >
                                <Box>
                            <FormLabel>
                                Destino
                                <Input value={destino} onChange={(e) => setDestino(e.target.value)} type="text" ></Input>
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
                                    label="Data de Pagamento"
                                    default={data_pagamento}
                                    onDateChange={handleDatePagamento}
                                ></Datepicker>
                            </Box>
                            <Flex marginLeft={"0px"} flexDir={"row"} justifyContent={"space-between"}>
                                <Box >
                                    <Checkbox onChange={(e) => setPaga(!paga)} isChecked={paga} size='md' colorScheme='green' >
                                        Paga?
                                    </Checkbox>
                                </Box>
                            </Flex>
                        </FormControl>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>

                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={()=>console.log("")} colorScheme="orange" backgroundColor={"orange.500"} mr={3} >
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

export default DebtInspectModal;