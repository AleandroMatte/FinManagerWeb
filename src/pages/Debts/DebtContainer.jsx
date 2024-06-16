import React, { useEffect, useMemo, useState } from 'react';
import DebtPage from './DebtPage';

const DebtContainer = () => {

    function format_date(date_to_format) {
        if(!date_to_format) return null;
        const dateObject = new Date(date_to_format);
    
        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const year = dateObject.getFullYear();
    
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
      }

    const columns = useMemo(() => [
        {
            accessorKey: 'destino',
            header: 'Destino',
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: 'valor',
            header: 'Valor',
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: 'data_pagamento',
            header: 'Data de Pagamento',
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: 'created_at',
            header: 'Data',
            cell: (props) => <p>{format_date(props.getValue())}</p>
        }
    ], [])



    return (
        <>
        
        <DebtPage columns={columns}  />
        </>
    );
};

export default DebtContainer;