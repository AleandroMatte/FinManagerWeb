import { Box, Card, CardBody, CardHeader, Flex, Stack, Text, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ButtonRefresAndAction from '../../components/RefreshAndAction';
import PostDebtModal from '../../components/PostDebtModal';
import PaginatedTable from '../../components/Table';
import handlePostResponse from '../../components/ToastMessage/Toast';
import BackendApi from '../../Services';
import { useNavigate } from 'react-router-dom';
import DebtInspectModal from '../../components/InspectDebtModal/DebtInspectModal';


const DebtPage = ({ columns }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen:isOpenInspectDebt, onOpen:onOpenInspectDebt, onClose:onCloseInspectDebt } = useDisclosure()
    const [columnFilters, SetColumnFilters] = useState([])
    const [estado_tabela, setEstadoTabela] = useState(null);
    const [loading, setIsloading] = useState(false)
    const [user_debts, setUserDebtData] = useState();
    const [ total_amount_paid, setTotalAmount] = useState();
    const [to_pay, setToPay] = useState();
    const [paid, setPaid] = useState();
    const [unpaid, setUnpaid] = useState();
    const [modal_data, setModalData] = useState();
    const toast = useToast()
    const navigate = useNavigate()

    const handleTableInstance = (table) => {
        setEstadoTabela(table);
    };


    async function fetch_user_debt() {
        try {
            const response = await BackendApi.get(`/user/debt`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("user_token")}`
                }
            })
            setUserDebtData(response?.data['Debts'])
            setToPay(response?.data['to_pay_this_year'])
            setPaid(response?.data['number_of_debts_paid'])
            setUnpaid(response?.data['unpaid_debts'])
            setTotalAmount(response?.data['total_amount_paid'])
        }
        catch (error) {
            if (error.response && error.response.status === 401) {
                handlePostResponse(toast, false, "Não Authenticado", "Favor reautenticar")
                navigate("/");
            }
            handlePostResponse(toast, false, "Algo deu errado", "tente novamente mais tarde")

        }

    }
    function handle_row_clicked(debt_data) {
        setModalData(debt_data)
        onOpenInspectDebt()
      }


    useEffect(() => {
        fetch_user_debt()
       
    }, [])



    return (
        <Flex flexDir={"column"} w={"100%"} padding={"1%"}>
            <ButtonRefresAndAction
                refresh_button_action={fetch_user_debt}
                plus_button_action={onOpen}
                plus_button_text={"Adicionar débito"}
            />
            <Flex flexDir={"row"} w={"100%"}>
                <Flex flexDir={"column"} h={"100%"} justifyContent={"space-evenly"} paddingRight={"10px"} paddingLeft={"10px"} >
                <Stack>
                        <Card bgColor={"whiteAlpha.600"}  variant ={"elevated"}><CardHeader textAlign={"center"}>Total Pago em 2024</CardHeader><CardBody>
                            <Flex justifyContent={"center"}>
                                <Text color={"green"} fontSize='2xl' as='b'>R$ {total_amount_paid}</Text>
                            </Flex></CardBody></Card>
                    </Stack>
                    <Stack   bg={"red"}>
                        <Card bgColor={"green.300"}  variant ={"elevated"}><CardHeader textAlign={"center"}>Dividas pagas em 2024</CardHeader><CardBody>
                            <Flex justifyContent={"center"}>
                                <Text fontSize='2xl' as='b'>{paid}</Text>
                            </Flex></CardBody></Card>
                    </Stack>
                    <Stack marginTop={"10%"} >
                        <Card  bg={"orange.300"} variant ={"elevated"}><CardHeader textAlign={"center"}>Total a pagar em 2024</CardHeader><CardBody>
                            <Flex justifyContent={"center"}>
                                <Text color={"red"} fontSize='2xl' as='b'>R${to_pay}</Text>
                            </Flex></CardBody></Card>
                    </Stack>
                    <Stack marginTop={"10%"} bg={"red"} >
                        <Card variant={"elevated"} bgColor={"red.300"}><CardHeader textAlign={"center"}>Dividas vencidas</CardHeader><CardBody>
                            <Flex justifyContent={"center"}>
                                <Text  fontSize='2xl' as='b'>{unpaid}</Text>
                            </Flex></CardBody></Card>
                    </Stack>
                </Flex>
                <PaginatedTable
                    data={user_debts ? user_debts : {}}
                    columnFilters={columnFilters}
                    columns={columns}
                    lift_table_state={handleTableInstance}
                    use_custom_filtering={true}
                    on_row_click={handle_row_clicked}
                />
            </Flex>

            {isOpen && (
                <PostDebtModal isOpen={isOpen} onClose={onClose} />
            )}
            {isOpenInspectDebt && (
                <DebtInspectModal modal_data={modal_data} isOpen={isOpenInspectDebt} onClose={onCloseInspectDebt} />
            )}
        </Flex>

    );
};

export default DebtPage;