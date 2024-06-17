import React, { useEffect, useMemo, useState } from 'react';
import WinPage from './WinPage';

const WinContainer = () => {

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
            accessorKey: 'origem',
            header: 'Destino',
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: 'valor',
            header: 'Valor',
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: 'data_recebimento',
            header: 'Data de Recebimento',
            cell: (props) => <p>{format_date(props.getValue())}</p>
        },
        {
            accessorKey: 'created_at',
            header: 'Data de criação',
            cell: (props) => <p>{format_date(props.getValue())}</p>
        },
        {
            accessorKey: 'recebida',
            header: 'Recebida?',
            cell: (props) => <p>{props.getValue()===true? "recebida":""}</p>
        }
    ], [])



    return (
        <>
        
        <WinPage columns={columns}  />
        </>
    );
};

export default WinContainer;