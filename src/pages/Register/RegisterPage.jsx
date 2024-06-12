import { Button, Flex, FormControl, FormHelperText, FormLabel, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel , useToast } from '@chakra-ui/react'
import handlePostResponse from '../../components/Toast';
import BackendApi from '../../Services';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const toast = useToast()
    const [button_recent_press , setButtonRecentPress] = useState(false);
    const navigate = useNavigate()
    const [login , setLogin] = useState("");
    const [first_name , setFirstName] = useState("");
    const [last_name , setLastName] = useState("");
    const [role , setRole] = useState("ADMIN");
    const [passwd , setPassWd] = useState("");
    const [passwd_confirmation , setPassWdConfirmation] = useState("");


    async function post_registration_data(){
        setButtonRecentPress(true)
        if (first_name ==="" || last_name ==="" ||login==="" || passwd==="" || passwd_confirmation===""){
            handlePostResponse(toast,false,"Erro","Todos os campos são obrigatórios!")
            setButtonRecentPress(false)

            return;
        }

        if(passwd.length<6){
            handlePostResponse(toast,false,"Erro","A senha deve ser de no mínimo 6 caracteres!")
            setButtonRecentPress(false)

            return;
        }

        if(passwd!== passwd_confirmation){
            handlePostResponse(toast,false,"Erro","As senhas não coincidem!")
            setButtonRecentPress(false)

            return;
        }

        const data = {
            first_name: first_name,
            last_name: last_name,
            role: role,
            user_name:login,
            password:passwd
        }

        try {

            const response = await BackendApi.post("/auth/register",data,{
                headers: {
                    "Content-Type": "application/json"
                }
            })
            localStorage.setItem("user_token",response.data?.token)
            setButtonRecentPress(false)
            navigate("/Home")
            handlePostResponse(toast,true,"Registro feito com Sucesso!",`seja bem vindo ${login}`)


            
        } catch (error) {
            console.log(error)
            handlePostResponse(toast,false,"Algo deu errado!",`Algo deu errado da nossa parte, volte mais tarde`)
            setButtonRecentPress(false)


        }

    }



    return (
        <Flex
            flexDir="column"
            boxShadow={"2xl"}
            justifyContent="center"
            alignItems="center"
            backgroundColor="whiteAlpha.900"
            height="100vh"
            width="100%">
            <Flex 
                bgColor={"whiteAlpha.400"}
                borderStyle={"inset"}
                boxShadow={"2xl"}
                w={"40%"}
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                
            >
                <Tabs minHeight={"50vh"} w={"100%"}   align='center'>
                    <TabList>
                        <Tab>Informações importantes</Tab>
                        <Tab>Registrar</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Text as='b' fontSize={"xl"}> Importante!</Text>
                            <hr></hr>
                            <Text fontSize={"xl"} textAlign={"initial"} >
                                Essa aplicação tem o intuito de demonstrar como uma
                                aplicação simples pode auxiliar o brasileiro comum a manter um
                                fluxo constante de investimentos a médio e longo prazo.
                                A aplicação ainda está em desenvolvimento e ainda pode apresentar:
                                instabilidade, alterações consideráveis de funcionamento, perda de Informações
                                e necessidade de recadastramento. Favor, Não inserir informações sensíveis 
                                nos formularios e usem com discrição!
                            </Text>
                        </TabPanel>
                        <TabPanel   justifyContent={"center"} >
                        <Stack   w={"70%"} >
                    <Heading size={"lg"}>Registrar</Heading>
                    <FormControl>
                        <FormLabel>Nome</FormLabel>
                        <Input type="text" placeholder="primeiro nome" onChange={(e) => setFirstName(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Sobrenome</FormLabel>
                        <Input type="text" placeholder="Sobrenome" onChange={(e) => setLastName(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel> Email</FormLabel>
                        <Input type="email" placeholder="email" onChange={(e) => setLogin(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Senha</FormLabel>
                        <Input
                            type="text"
                            placeholder="senha"
                            onChange={(e) => setPassWd(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Confirmar Senha</FormLabel>
                        <Input
                            type="text"
                            placeholder="confirmar senha"
                            onChange={(e) => setPassWdConfirmation(e.target.value)}
                        />
                    </FormControl>
                    <Button disabled={button_recent_press} onClick={post_registration_data} color={"white"} bgColor={"orange.400"}>Criar Conta</Button>

                </Stack>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
              
            </Flex>
        </Flex>
    );

}

export default RegisterPage;