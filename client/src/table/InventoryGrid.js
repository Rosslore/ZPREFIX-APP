import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Stack from '@mui/material/Stack';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'; import EditIcon from '@mui/icons-material/Edit';
import { yellow } from "@mui/material/colors";

const handleClick = (id) => {
    // useEffect (() => {
    //     async function deleteInventory() {
    //         await fetch(`http://localhost:8080/inventory/${id}`, { method: 'DELETE'});
    //     }
    //     deleteInventory();
    // }, [id]);
}



const columns = [
    { field: 'id', headerName: 'ID', flex: .1, headerClassName: 'headers' },
    { field: 'name', headerName: 'Name', flex: .2, headerClassName: 'headers' },
    { field: 'description', headerName: 'Description', flex: .5, headerClassName: 'headers' },
    { field: 'quantity', headerName: 'Quantity', flex: .2, headerClassName: 'headers' },
    {
        field: ' ', flex: .2, headerClassName: 'headers',
        renderCell: (cellValues) => {
            return (
                <Stack
                    direction="row"
                    spacing={1}
                >
                    <IconButton
                        onClick={() => handleClick(cellValues.id)}
                    >
                        <EditIcon sx={{ color: "#F1C40F" }} />
                    </IconButton>
                    <IconButton
                        onClick={() => handleClick(cellValues.id)}
                    >
                        <DeleteForeverOutlinedIcon sx={{ color: "#C41E3A" }} />
                    </IconButton>
                </Stack>

            )
        }
    },
];


const InventoryGrid = () => {
    const [inventoryTableData, setInventoryTableData] = useState([]);
    const [rows, setRows] = useState(inventoryTableData);
    // const [deletedRows, setDeletedRows] = useState([]);



    useEffect(() => {
        fetch("http://localhost:8080/inventory")
            .then((res) => res.json())
            .then((data) => setInventoryTableData(data))
    }, []);

    console.log(inventoryTableData);

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={inventoryTableData}
                columns={columns}

                initialState={{ pagination: { pageSize: 25 } }}
                rowsPerPageOptions={[25, 50, 100]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}

export default InventoryGrid;