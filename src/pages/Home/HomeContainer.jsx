import { Link, Box, Card, Flex, CardHeader, CardBody, Stack, Text, useToast, Heading, Tooltip } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import BackendApi from '../../Services';
import handlePostResponse from '../../components/ToastMessage/Toast';
import { useNavigate } from 'react-router-dom';


const HomeContainer = () => {
    const [user_debts, SetUserDebts] = useState();
    const [user_wins, setUserWins] = useState();
    const [user_win_analyticsData, setUserWinAnalyticsData] = useState();
    const [user_win_analyticsLabels, setUserWinAnalyticsLabels] = useState();
    const [amount_recieved, setAmountRecieved] = useState();
    const [amount_Paid, setAmountPaid] = useState();
    const [start_date, setStartDate] = useState("1900-01-01");
    const [end_date, setEndDate] = useState("2050-12-31");
    const navigate = useNavigate();
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

    async function get_user_win_analytics() {
        try {
            const response = await BackendApi.get("/user/wins/analytics", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("user_token")}`
                },
                params: {
                    period_start: start_date,
                    period_end: end_date
                }
            })

            extracRelevantData(response?.data)
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
    function extracRelevantData(input) {
        let data = [];
        let labels = []
        for (let month in input) {
            labels = labels.concat(month)
            data = data.concat(input[month].total_amout_of_data);
        }
        setUserWinAnalyticsData(data)
        setUserWinAnalyticsLabels(labels)
    }


    async function fetch_user_wins() {
        try {
            const response = await BackendApi.get(`/user/wins`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("user_token")}`
                }
            })
            setAmountRecieved(response?.data['total_amount_recieved'])
            setUserWins(response?.data['win_data'].slice(0, 3))
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
    async function fetch_user_debts() {
        try {
            const response = await BackendApi.get(`/user/debt`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("user_token")}`
                }
            })
            setAmountPaid(response?.data['total_amount_paid'])
            SetUserDebts(response?.data['Debts'].slice(0, 3))
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
        fetch_user_wins()
        fetch_user_debts()
        get_user_win_analytics()

    }, [])
    return (
        <Flex width={"100%"} h={"100vh"} flexDir={"column"} alignItems={"center"} >
            <Flex w={"90%"} h={"20vh"} justifyContent={"space-between"} margin={"10px"} >
                <Link href='/Wins' w={"35%"}  >
                    <Card w={"100%"} maxH={"20vh"} borderColor={"black"} borderWidth={"1px"} borderStyle={"dotted"} bg={"green.100"} variant={"elevated"} boxShadow={"xl"}>
                        <Heading size={"m"} textAlign={"center"}>Recebimentos</Heading ><CardBody >
                            <Flex justifyContent={"center"} flexDir={"column"} >
                                {user_wins?.map((item, index) =>
                                    <Text borderWidth={"0px 0px 1px 0px"} borderColor={"black"} as={"b"} color={"green.500"}>{item?.origem}         {format_date(item?.data_recebimento)}----------{"> "}R${item?.valor}</Text>
                                )}
                            </Flex></CardBody></Card>
                </Link>
                <Flex maxH={"20vh"} flexDir={"row"} w={"25%"} bgColor={"orange.300"} borderRadius={"20px"} justifyContent={"space-evenly"} alignContent={"center"}>
                    <Flex flexDir={"column"}  >

                        <Text w={"100%"} as="b" fontSize={"xl"}> Recebido</Text>
                        <Text color={"green"} margin={"auto"} w={"100%"} fontSize={"xl"} as="b"> R${amount_recieved}</Text>
                    </Flex>
                    <div style={{ borderLeft: "1px solid #000", height: "100%" }}></div>
                    <Flex flexDir={"column"} textAlign={"center"}>

                        <Text w={"100%"} as="b" fontSize={"xl"} > Pago</Text>
                        <Text color={"red"} margin={"auto"} w={"100%"} fontSize={"xl"} as="b"> R${amount_Paid}</Text>
                    </Flex>
                </Flex>
                <Link href='/Debts' maxH={"20vh"} w={"35%"}>
                    <Card w={"100%"} maxH={"20vh"} borderColor={"black"} borderWidth={"1px"} borderStyle={"dotted"} bg={"red.100"} variant={"elevated"} boxShadow={"xl"}>
                        <Heading size={"m"} textAlign={"center"}>Dividas</Heading ><CardBody >
                            <Flex justifyContent={"center"} flexDir={"column"}>
                                {user_debts?.map((item, index) =>
                                    <Text borderWidth={"0px 0px 1px 0px"} borderColor={"black"} as={"b"} color={"red.500"}>{item?.destino}         {format_date(item?.data_pagamento)}----------{"> "}R${item?.valor}</Text>
                                )}
                            </Flex></CardBody></Card>
                </Link>

            </Flex>
        </Flex>
    );
};

export default HomeContainer;