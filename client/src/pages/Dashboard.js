import UserGrid from "../table/UserGrid";
import InventoryGrid from "../table/InventoryGrid";


const Dashboard = () => {
    return (
        <div>
            <h1>Users</h1>
            <UserGrid />
            <hr />
            <h1>Inventory</h1>
            <InventoryGrid />
        </div>
    );
}

export default Dashboard;