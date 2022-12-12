// import UserGrid from "../table/UserGrid";
import InventoryGrid from "../table/InventoryGrid";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";



const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>

            <hr />
            <h1>Inventory Dashboard</h1>
            <Button variant="contained" color="primary" onClick={() => navigate('/newitem')}>Add New Item</Button>
            <InventoryGrid />
            </Box>
        </div>
    );
}

export default Dashboard;