import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5002/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5002/api/products/${id}`);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3} justifyContent="center" alignItems="stretch">
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id} sx={{ display: 'flex' }}>
                        <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={product.imageUrl}
                                alt={product.name}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                                <Typography variant="h6" color="text.primary">
                                    ${product.price}
                                </Typography>
                            </CardContent>
                            <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                <IconButton aria-label="delete" onClick={() => handleDelete(product.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProductList;
