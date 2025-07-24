import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  IconButton,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { Close } from "@mui/icons-material";
import ProductDetails from "./ProductDetails";
import { AnimatePresence, motion } from "framer-motion";

// Mock product data
const mockProducts = [
  {
    id: 1,
    attributes: {
      productTitle: "Men's Jacket",
      productPrice: 49.99,
      productRating: 4.5,
      productDescription: "A stylish men's jacket.",
      category: "men",
      productImg: {
        data: [
          { id: 1, attributes: { url: "/images/1.jpg" } },
          { id: 2, attributes: { url: "/images/2.jpg" } }
        ]
      }
    }
  },
  {
    id: 2,
    attributes: {
      productTitle: "Women's Dress",
      productPrice: 59.99,
      productRating: 4.8,
      productDescription: "A beautiful women's dress.",
      category: "women",
      productImg: {
        data: [
          { id: 3, attributes: { url: "/images/banner-15.jpg" } },
          { id: 4, attributes: { url: "/images/banner-16.jpg" } }
        ]
      }
    }
  },
  // Add more mock products as needed
];

const Main = () => {
  const handleAlignment = (event, newValue) => {
    if (newValue !== null) {
      setmyDate(newValue);
    }
  };

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const allProductsAPI = "all";
  const menCategoryAPI = "men";
  const womenCategoryAPI = "women";
  const [myDate, setmyDate] = useState(allProductsAPI);
  const [clickedProduct, setclickedProduct] = useState({});

  // Filter products based on selected category
  let filteredProducts = mockProducts;
  if (myDate === menCategoryAPI) {
    filteredProducts = mockProducts.filter(p => p.attributes.category === "men");
  } else if (myDate === womenCategoryAPI) {
    filteredProducts = mockProducts.filter(p => p.attributes.category === "women");
  }

  if (filteredProducts.length === 0) {
    return (
      <Container sx={{ py: 11, textAlign: "center" }}>
        <Typography variant="h6">No products found in this category.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 9 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        gap={3}
      >
        <Box>
          <Typography variant="h6">Selected Products</Typography>
          <Typography fontWeight={300} variant="body1">
            All our new arrivals in a exclusive brand selection
          </Typography>
        </Box>

        <ToggleButtonGroup
          color="error"
          value={myDate}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          sx={{
            ".Mui-selected": {
              border: "1px solid rgba(233, 69, 96, 0.5) !important",
              color: "#e94560",
              backgroundColor: "initial",
            },
          }}
        >
          <ToggleButton
            sx={{ color: theme.palette.text.primary }}
            className="myButton"
            value={allProductsAPI}
            aria-label="left aligned"
          >
            All Products
          </ToggleButton>

          <ToggleButton
            sx={{ mx: "16px !important", color: theme.palette.text.primary }}
            className="myButton"
            value={menCategoryAPI}
            aria-label="centered"
          >
            MEN category
          </ToggleButton>

          <ToggleButton
            sx={{ color: theme.palette.text.primary }}
            className="myButton"
            value={womenCategoryAPI}
            aria-label="right aligned"
          >
            Women category
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
      >
        <AnimatePresence>
          {filteredProducts.map((item) => {
            return (
              <Card
                component={motion.section}
                layout
                initial={{ transform: "scale(0)" }}
                animate={{ transform: "scale(1)" }}
                transition={{ duration: 1.6, type: "spring", stiffness: 50 }}
                key={item.id}
                sx={{
                  maxWidth: 333,
                  mt: 6,
                  ":hover .MuiCardMedia-root ": {
                    rotate: "1deg",
                    scale: "1.1",
                    transition: "0.35s",
                  },
                }}
              >
                <CardMedia
                  sx={{ height: 277 }}
                  image={`${item.attributes.productImg.data[0].attributes.url}`}
                  title={item.attributes.productTitle}
                />

                <CardContent>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography gutterBottom variant="h6" component="div">
                      {item.attributes.productTitle}
                    </Typography>

                    <Typography variant="subtitle1" component="p">
                      ${item.attributes.productPrice}
                    </Typography>
                  </Stack>

                  <Typography variant="body2" color="text.secondary">
                    {item.attributes.productDescription}
                  </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Button
                    onClick={() => {
                      handleClickOpen();
                      setclickedProduct(item);
                    }}
                    sx={{ textTransform: "capitalize" }}
                    size="large"
                  >
                    <AddShoppingCartOutlinedIcon
                      sx={{ mr: 1 }}
                      fontSize="small"
                    />
                    add to cart
                  </Button>
                  <Rating
                    precision={0.1}
                    name="read-only"
                    value={item.attributes.productRating}
                    readOnly
                  />
                </CardActions>
              </Card>
            );
          })}
        </AnimatePresence>
      </Stack>

      <Dialog
        sx={{ ".MuiPaper-root": { minWidth: { xs: "100%", md: 800 } } }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <IconButton
          sx={{
            ":hover": { color: "red", rotate: "180deg", transition: "0.3s" },
            position: "absolute",
            top: 0,
            right: 10,
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>

        <ProductDetails clickedProduct={clickedProduct} />
      </Dialog>
    </Container>
  );
};

export default Main;