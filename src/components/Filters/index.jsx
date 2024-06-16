import { SearchIcon } from '@chakra-ui/icons';
import { Box, Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';

const TableFilter = ({row_identificator, columnFilters, setColumnFilters}) => {
    const row_id_inputted = columnFilters?.find(
        filter_input => filter_input?.id === row_identificator
    )?.value || "";

    function onfilterChange(id, value){
        setColumnFilters(
            prev => prev?.filter(filter_input => filter_input.id !== id) .concat({
                id,value
            }))
    }
    return (
        <Box >
            <InputGroup >
                <InputLeftElement pointerEvents={"none"}>
                <Icon as={SearchIcon}/>
                </InputLeftElement>
                    <Input 
                    type='text'
                    variant={"filled"}
                    placeholder={row_identificator}
                    onChange={ (e) => onfilterChange(row_identificator,e.target.value)}
                    borderRadius={5}
                    value={row_id_inputted}>
                    </Input>
            </InputGroup>
        </Box>
    );
};

export default TableFilter;