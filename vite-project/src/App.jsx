import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import EmployeeDetails from "./components/EmployeeDetails";
import AddEditEmployee from "./components/AddEditEmployee";
import Navbar from "./components/navbar";
import { CssBaseline, Container } from "@mui/material";
import EditEmployee from "./components/EditEmployee";

function App() {
  return (
    // <Router>
    <>
      <CssBaseline />
      <Navbar /> {/* Ensure Navbar is rendered */}
      <Container>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
          <Route path="/add" element={<AddEditEmployee />} />
          <Route path="/edit/:id" element={<EditEmployee />} />
        </Routes>
      </Container>
    {/* // </Router> */}
  </>
  );
}

export default App;