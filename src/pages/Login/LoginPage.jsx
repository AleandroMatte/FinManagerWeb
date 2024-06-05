import React, { useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
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
  Text
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";


const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

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
            <Image src='src/assets/Logo_personalizada_sem_fundo.png' height={"60%"} width={"100%"} />
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
          height="100%">
          <Stack height={"80%"} width={"80%"} backgroundColor="whiteAlpha.500" justifyContent="center" alignItems="center" boxShadow={"2xl"}>
            <Avatar bg="black"/>
            <Heading color="orange.400">Welcome</Heading>
            <Box width="100%">
              <form >
                <Stack
                  spacing={4}
                  p="8%">
                  <FormControl>
                    <InputGroup width={"80%"} margin={"auto"}>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<CFaUserAlt color="gray.300" />}
                      />
                      <Input type="email" placeholder="email address" />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup width={"80%"} margin={"auto"}>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        children={<CFaLock color="gray.300" />}
                      />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                      />
                      <InputRightElement width="40%">
                        <Button h="80%" left={"20%"} onClick={handleShowClick}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormHelperText textAlign="right" marginRight={"10%"}>
                      <Link>forgot password?</Link >
                    </FormHelperText>
                  </FormControl>
                  <Button
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
              </form>
            </Box>
            <Box>
              New to us?{" "}
              <Link color="orange.500" href="#">
                Sign Up
              </Link>
            </Box>
          </Stack>
        </Flex>
      </Flex>
    </Flex>

  );
};

export default LoginPage;