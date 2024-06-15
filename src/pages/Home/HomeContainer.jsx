import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const HomeContainer = () => {
    const [user_debts, GetUserDebts] = useState();
    const [user_wins, GetUserWins] = useState();



    useEffect( () => {

        //get user debts and wins

    },[])
    return (
   <Flex width={"100%"} h={"100vh"} flexDir={"column"} alignItems={"center"} >
        <Flex   w={"90%"} h={"20vh"} justifyContent={"space-between"} margin={"10px"}>
            <Box w={"35%"} bgColor={"green.400"} borderRadius={"20px"} boxShadow={"xl"}></Box>
            <Box w={"20%"} bgColor={"orange.300"} borderRadius={"20px"} boxShadow={"xl"}></Box>
            <Box w={"35%"} bgColor={"red.400"} borderRadius={"20px"} boxShadow={"xl"} borderColor={"black"}></Box>

        </Flex>
   </Flex>
    );
};

export default HomeContainer;