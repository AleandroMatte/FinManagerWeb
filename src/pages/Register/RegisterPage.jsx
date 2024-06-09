import { Button, Flex, FormControl, FormHelperText, FormLabel, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

const RegisterPage = () => {
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
                        <FormLabel> Email</FormLabel>
                        <Input type="email" placeholder="email" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Senha</FormLabel>
                        <Input
                            type="text"
                            placeholder="senha"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Confirmar Senha</FormLabel>
                        <Input
                            type="text"
                            placeholder="confirmar senha"
                        />
                    </FormControl>
                    <Button color={"white"} bgColor={"orange.400"}>Criar Conta</Button>

                </Stack>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
              
            </Flex>
        </Flex>
    );
};

export default RegisterPage;