import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';



const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'first_name', headerName: 'First name', width: 130 },
    { field: 'last_name', headerName: 'Last name', width: 130 },
    { field: 'username', headerName: 'Username', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'role', headerName: 'Role', width: 130 },
];

const UserGrid = () => {
    const [userTableData, setUserTableData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/user")
            .then((res) => res.json())
            .then((data) => setUserTableData(data))
            },[]);

        console.log(userTableData);

        return (
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
            rows={userTableData}
            columns={columns}
            checkboxSelection={true}
            disableSelectionOnClick={true}
        />
            </div>
        );
    }


export default UserGrid;
