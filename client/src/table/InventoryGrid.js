import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Stack from '@mui/material/Stack';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'; 
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { yellow } from "@mui/material/colors"
import Context from "../context/Context";
import { useSubmit } from "react-router-dom";

const handleDelete = (id) => {
    try {
        fetch(`http://localhost:8080/inventory/${id}`, {
            method: "DELETE"
        })
    } catch (error) {
        console.log(error);
    }

}

const handleModify = (id) => {
    try {
        fetch(`http://localhost:8080/inventory/${id}`, {
            method: "PATCH"
        })
    } catch (error) {
        console.log(error);
    }
}
const handleAdd = (id) => {
    try {
        fetch(`http://localhost:8080/inventory/${id}`, {
            method: "POST"
        })
    } catch (error) {
        console.log(error);
    }
}

function createData(id, name, description, quantity) {
    return { id, name, description, quantity };
}


const columns = [
    { field: 'id', headerName: 'ID', flex: .1, editable: true},
    { field: 'name', headerName: 'Name', flex: .2, editable: true},
    { field: 'description', headerName: 'Description', flex: .5, editable: true},
    { field: 'quantity', headerName: 'Quantity', flex: .2, editable: true},
    {
        field: 'Actions', flex: .2, headerClassName: 'headers',
        renderCell: (cellValues) => {
            return (
                <Stack
                    direction="row"
                    spacing={1}
                >
                    <IconButton
                        onClick={() => handleModify(cellValues.id)}
                    >
                        <EditIcon sx={{ color: "#F1C40F" }} />
                    </IconButton>
                    <IconButton
                        onClick={() => handleDelete(cellValues.id)}
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
    const [rowModesModel, setRowModesModel] = useState({    });
    const [submit, setSubmit] = useState(false);
    const [userInventory, setUserInventory] = useState([]);
    const { user } = useContext(Context);

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: 'edit' });
    };

    const handleRowSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: 'view' });
    };

    const handleRowDeleteClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: 'delete' });
    };

    const handleRowEditCancel = (id) => () => {
        setRowModesModel({...rowModesModel, [id]: 'view', });
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };




    useEffect(() => {
        fetch("http://localhost:8080/inventory")
            .then((res) => res.json())
            .then((data) => setInventoryTableData(data))
    }, []);

    console.log(inventoryTableData);

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                editMode = "row" 
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