import React, { useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Image,
  Text,
  FormLabel,
  useToast
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaEye } from "react-icons/fa";
import BackendApi from '../../Services';
import handlePostResponse from '../../components/Toast';
import { useNavigate } from 'react-router-dom';


const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [buttonPressed, setButtonRecentPress] = useState(false);
  const [login, setLogin] = useState();
  const [passwd, setPassd] = useState();
  const toast = useToast();
  const navigate = useNavigate();


  const handleShowClick = () => setShowPassword(!showPassword);



  async function post_registration_data(){
    setButtonRecentPress(true)
    if (login==="" || passwd===""){
        handlePostResponse(toast,false,"Erro","Todos os campos são obrigatórios!")
        setButtonRecentPress(false)

        return;
    }


    const data = {
        username:login,
        password:passwd
    }

    try {

        const response = await BackendApi.post("/auth/authenticate",data,{
            headers: {
                "Content-Type": "application/json"
            }
        })
        localStorage.setItem("user_token",response.data?.token)
        setButtonRecentPress(false)
        navigate("/Home")
        handlePostResponse(toast,true,"Login feito com Sucesso!",`seja bem vindo ${login}`)

        
    } catch (error) {
        console.log(error)
        handlePostResponse(toast,false,"Algo deu errado!",`Algo deu errado da nossa parte, volte mais tarde`)
        setButtonRecentPress(false)


    }

}

  return (
    <Flex
      flexDirection="column"
      width="100%"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"

    >
      <Flex
        flexDir="row"
        height="100%"
        width="100%"
        overflow="hidden"
        backgroundColor={"black"}
      >
        <Flex width="50%" alignContent={"center"} justifyContent={"center"}   maxH={"100%"}>
          <Image src='src/assets/StockSnap_JONMP7TPGK.jpg' width={"50%"}  opacity={"30%"}  position={"absolute"}  height={"100%"}/>
          <Stack justifyContent={"center"} alignContent={"center"} alignItems={"center"}  width={"60%"} height={"50%"} zIndex={"10"} position={"relative"} top={"20%"}   >
            <Image src='src/assets/Logo_personalizada_sem_fundo.png' height={"70%"} width={"90%"} overflow={"hidden"}/>
            <Text color={"orange.100"} fontFamily={"serif"} fontSize={18} fontWeight={"600"}>GERENCIE CADA CENTAVO</Text>
          </Stack>
        </Flex>
        <Flex
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
          backgroundColor="whiteAlpha.900"
          width="50%"
          height="100vh">
          <Stack  width={"80%"} height={"80%"} backgroundColor="whiteAlpha.500" justifyContent="center" alignItems="center" boxShadow={"2xl"}
          padding={"10%"}>
            <Avatar bg="black" margin={"auto"}/>
            <Heading color="orange.400">Bem Vindo</Heading>
            <Box width={"100%"} height={"100%"}  marginBottom={"0px"}>
                <Stack
                width={"80%"}
                margin={"0px auto"}
                  spacing={4}>
                  <FormControl label='login'>
                    <FormLabel marginLeft={"5px"}>Email</FormLabel>
                      <Input onChange={(e) => setLogin(e.target.value)}  type="email" placeholder="email" />
                  </FormControl>
                  <FormControl>
                  <FormLabel marginLeft={"5px"}>Senha</FormLabel>
                      <Input onChange={(e) => setPassd(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        placeholder="senha"
                      />
                        <Button marginLeft={"5px"} h="100%" padding={"2px"} bgColor={"gray.200"}  onClick={handleShowClick}>
                          {showPassword ? <FaLock/>: <FaEye/>}
                        </Button>
                    <FormHelperText textAlign="right" marginRight={"10%"}>
                      <Link>Esqueci minha senha</Link >
                    </FormHelperText>
                  </FormControl>
                  <Button
                    onClick={post_registration_data}
                    disabled ={buttonPressed}
                    borderRadius={0}
                    type="submit"
                    variant="solid"
                    colorScheme="orange"
                    width="50%"
                    margin={"auto"}
                  >
                    Login
                  </Button>
                </Stack>

                <Box textAlign={"center"} marginTop={"3%"}>
              Ainda não tem uma conta?{" "}
              <Link  color="orange.500" href="/Register">
                Criar Conta
              </Link>
            </Box>
            </Box>
          </Stack>
        </Flex>
      </Flex>
    </Flex>

  );
};

export default LoginPage;