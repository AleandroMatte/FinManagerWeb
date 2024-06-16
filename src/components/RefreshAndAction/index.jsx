import React from 'react';

import {
    Box,
    Flex,
    Button
} from '@chakra-ui/react';
import { RepeatIcon, AddIcon } from '@chakra-ui/icons';
const ButtonRefresAndAction = ({refresh_button_action, plus_button_action, plus_button_text }) => {
    return (
        <Flex   flexDir={'row'} justifyContent={'flex-end'} gap={'10px'} padding={"20px"} >
        <Button onClick={()=>refresh_button_action()} leftIcon={<RepeatIcon />} >Refresh</Button>
        <Button onClick={()=>plus_button_action()}  leftIcon = {<AddIcon/>} backgroundColor={'orange.400'} color={'white'} >{plus_button_text}</Button>
      </Flex>
    );
};

export default ButtonRefresAndAction;