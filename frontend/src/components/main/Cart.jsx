import React, { useState } from "react";
import { Box, Container, Typography, Stack, Card, CardContent, CardMedia, IconButton, Button, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

// Mock cart data
const initialCart = [
  {
    id: 1,
    title: "Men's Jacket",
    price: 49.99,
    image: "/images/1.jpg",
    quantity: 1
  },
  {
    id: 2,
    title: "Women's Dress",
    price: 59.99,
    image: "/images/banner-15.jpg",
    quantity: 2
  }
];

const Cart = () => {
  const [cart, setCart] = useState(initialCart);

  const handleQuantityChange = (id, value) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, Number(value)) } : item
    ));
  };

  const handleRemove = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" mb={4}>Shopping Cart</Typography>
      {cart.length === 0 ? (
        <Typography variant="h6">Your cart is empty.</Typography>
      ) : (
        <>
          <Stack spacing={3} mb={4}>
            {cart.map(item => (
              <Card key={item.id} sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 2, mr: 3 }}
                  image={item.image}
                  alt={item.title}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography color="text.secondary">${item.price.toFixed(2)}</Typography>
                </CardContent>
                <TextField
                  type="number"
                  label="Qty"
                  size="small"
                  value={item.quantity}
                  onChange={e => handleQuantityChange(item.id, e.target.value)}
                  inputProps={{ min: 1, style: { width: 50 } }}
                  sx={{ mx: 2 }}
                />
                <IconButton color="error" onClick={() => handleRemove(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </Card>
            ))}
          </Stack>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
            <Button variant="contained" color="primary" size="large">Checkout</Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Cart; 