import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Context from '../context/Context';
import {
    Container,
    Button,
    Grid,
    Paper,
    TextField,
    IconButton,
    InputAdornment,
} from "@mui/material"

const EditItem = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const { cookies, setCookies } = useContext(Context);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/inventory/:id', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name, description: description, quantity: quantity }),
                credentials: 'include'
            });

            const data = await response.json();
            if (data.error) {
                console.log(data.error);
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div>
            <Container maxWidth="sm">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper elevation={3}>
                            <form onSubmit={handleSubmit}>
                                <h1>New Item</h1>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="itemName"
                                            label="Item Name"
                                            variant="outlined"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="itemDescription"
                                            label="Item Description"
                                            variant="outlined"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="itemQuantity"
                                            label="Item Quantity"
                                            variant="outlined"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            type="submit"
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

        </div>
    );

}
export default NewItem;



