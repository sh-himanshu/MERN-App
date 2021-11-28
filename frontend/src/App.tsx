import { Container } from "@mui/material";

import { Outlet } from "react-router";

import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <Container maxWidth="lg">
      <Navbar />
      <Outlet />
    </Container>
  );
};

export default App;
