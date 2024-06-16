import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import "./table.css";
import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/layout';
import { Table, Td, Th, Tr } from '@chakra-ui/table';
import { Button, ButtonGroup } from '@chakra-ui/button';
import { Flex } from '@chakra-ui/react';
import TableFilter from '../Filters'

const PaginatedTable = ({ columns, data, on_row_click, columnFilters, use_custom_filtering, row_identificator,
    setColumnFilters, lift_table_state }) => {

    const table = useReactTable({
        columns: columns,
        data: data,
        state: {
            columnFilters,
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })


    useEffect(() => {
        if (lift_table_state) {
            lift_table_state(table);
        }
    }, [table, lift_table_state]);
    return (
        <>

            <Flex w={"100%"} minH={"80vh"}  flexDir={"column"}>
                <Box minH={"60vh"}>
                    <Table className='content-table' >
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) =>
                                (<Th className='content-table-header_row' key={header.id}>
                                    {header.column.columnDef.header}
                                    <Box ></Box>
                                </Th>

                                ))}

                            </Tr >
                        ))}
                        {table.getRowModel().rows?.map((row) => (<Tr onClick={() => on_row_click ? on_row_click(row.original) : console.log("")} key={row.id}>
                            {row.getVisibleCells().map((cell) => (<Td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </Td>
                            ))}
                        </Tr>
                        ))}
                    </Table>
                    <br />
                </Box>
                <Flex flexDir={"row"} justifyContent={'space-between'} width={"100%"}>
                    {use_custom_filtering?
                        <></>
                        :
                        <TableFilter row_identificator={row_identificator ? row_identificator : ""}
                        columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
                        }
                    <Box>
                        <Text mb={2} >
                            Página {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </Text>
                        <ButtonGroup size={"sm"} isAttached variant={'outline'} >
                            <Button onClick={() => table.previousPage()} isDisabled={!table.getCanPreviousPage()}>{"<"}</Button>
                            <Button onClick={() => table.nextPage()} isDisabled={!table.getCanNextPage()}>{">"}</Button>
                        </ButtonGroup>
                    </Box>
                </Flex>
            </Flex>
        </>
    )
}





export default PaginatedTable;