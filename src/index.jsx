import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Navbar from "./components/Navbar/Navbar";
import Home from "./routes/Home";
import Footer from "./components/Footer/Footer";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./routes/Login";
import Detail from "./routes/Detail";
import { ThemeProvider } from "./hooks/useTheme";

const root = ReactDOM.createRoot(document.getElementById("root"));
//Lembre-se de configurar suas rotas e seu contexto aqui
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Contact />}></Route>
          <Route path="/detail" element={<Detail />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
