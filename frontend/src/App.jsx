import Header2 from "./components/header/Header2";
import Header1 from "./components/header/Header1";
import Header3 from "./components/header/Header3";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Hero from "./components/hero/Hero";
import Main from "./components/main/main";
import Footer from "./components/footer/footer";
import ScrollToTop from "./components/scroll/ScrollToTop";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./components/main/Cart";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider
      // @ts-ignore
      value={colorMode}
    >
      <ThemeProvider
        // @ts-ignore
        theme={theme}
      >
        <CssBaseline />
        <Router>
          <Header1 />
          <Header2 />
          <Header3 />
          <Box
            bgcolor={
              // @ts-ignore
              theme.palette.bg.main
            }
          >
            <Routes>
              <Route path="/" element={<><Hero /><Main /></>} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Box>
          <Footer />
          <ScrollToTop />
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
