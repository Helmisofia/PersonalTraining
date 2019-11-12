import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const Customerlist = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, [])

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }

    const columns = [
        {
            Header: 'Firstname',
            accessor: 'firstname'
        },
        {
            Header: 'Lastname',
            accessor: 'lastname'
        },
        {
            Header: 'Streetaddress',
            accessor: 'streetaddress'
        },
        {
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },
        {
            filterable: false,
            sortable: false,
            width: 100,
        },
    ]

    return (
        <div>
            <ReactTable filterable={true} columns={columns} data={customers} />
        </div>
    );
}

export default Customerlist;