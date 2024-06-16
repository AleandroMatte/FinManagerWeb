import { Box, Card, CardBody, CardHeader, Flex, Stack, Text, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ButtonRefresAndAction from '../../components/RefreshAndAction';
import PostDebtModal from '../../components/PostDebtModal';
import PaginatedTable from '../../components/Table';
import handlePostResponse from '../../components/ToastMessage/Toast';
import BackendApi from '../../Services';
import { useNavigate } from 'react-router-dom';
import PostWinModal from '../../components/PostWinModal';


const WinPage = ({ columns }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [columnFilters, SetColumnFilters] = useState([])
    const [estado_tabela, setEstadoTabela] = useState(null);
    const [loading, setIsloading] = useState(false)
    const [user_wins, setUserWins] = useState();
    const [to_win, setToWin] = useState();
    const [won, setWon] = useState();
    const [still_not_won, setStillNotWon] = useState();
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
            setUserWins(response?.data['win_data'])
            to_win(response?.data['num_of_wins_to_recieve'])
            won(response?.data['num_of_wins_recieved'])
            still_not_won(response?.data['recebimentos_não_feitos'])
        }
        catch (error) {
            if (error.response && error.response.status === 401) {
                handlePostResponse(toast, false, "Não Authenticado", "Favor reautenticar")
                navigate("/")
                return
            }
            handlePostResponse(toast, false, "Algo deu errado", "tente novamente mais tarde")

        }

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
            /> {/*
            <Flex flexDir={"row"} w={"100%"}>
                <Flex flexDir={"column"} h={"100%"} justifyContent={"space-evenly"} paddingRight={"10px"} paddingLeft={"10px"} >
                    <Stack   bg={"red"}>
                        <Card bgColor={"green.300"}  variant ={"elevated"}><CardHeader textAlign={"center"}>Quantidade de recebimentos em 2024</CardHeader><CardBody>
                            <Flex justifyContent={"center"}>
                                <Text fontSize='2xl' as='b'>{won}</Text>
                            </Flex></CardBody></Card>
                    </Stack>
                    <Stack marginTop={"10%"} >
                        <Card  bg={"orange.300"} variant ={"elevated"}><CardHeader textAlign={"center"}>Recebimentos em 2024</CardHeader><CardBody>
                            <Flex justifyContent={"center"}>
                                <Text fontSize='2xl' as='b'>{to_win}</Text>
                            </Flex></CardBody></Card>
                    </Stack>
                    <Stack marginTop={"10%"} bg={"red"} >
                        <Card variant={"elevated"} bgColor={"red.300"}><CardHeader textAlign={"center"}>Recebimentos Vencidos</CardHeader><CardBody>
                            <Flex justifyContent={"center"}>
                                <Text  fontSize='2xl' as='b'>{still_not_won}</Text>
                            </Flex></CardBody></Card>
                    </Stack>
                </Flex>
                <PaginatedTable
                    data={user_debts ? user_debts : {}}
                    columnFilters={columnFilters}
                    columns={columns}
                    lift_table_state={handleTableInstance}
                    use_custom_filtering={true}
                    on_row_click={() => console.log(" ")}
                />
            </Flex>
                */}
            {isOpen && (
                <PostWinModal isOpen={isOpen} onClose={onClose} />
            )}
        </Flex>

    );
};

export default WinPage;