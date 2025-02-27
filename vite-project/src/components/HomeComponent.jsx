import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { 
  Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert 
} from "@mui/material";
import "./HomeComponent.css";

const HomeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleSearch = async () => {
    if (!searchId) {
      fetchEmployees();
      return;
    }
    try {
      const response = await axios.get(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${searchId}`);
      if (response.data) {
        setEmployees([response.data]);
      } else {
        setEmployees([]);
        setSnackbarMessage("No employee found.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error searching employee:", error);
      setEmployees([]);
      setSnackbarMessage("No employee found.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${deleteId}`);
      fetchEmployees();
      setOpenConfirm(false);
      setSnackbarMessage("Employee deleted successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="box-shadow">
      <br />
      <TextField
        label="Search by ID"
        variant="outlined"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch} style={{ marginLeft: "10px" }}>Search</Button>
      <Button variant="contained" component={Link} to="/add" style={{ marginLeft: "10px" }}>Add Employee</Button>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.id}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.emailId}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/employee/${emp.id}`} variant="outlined">View</Button>
                  <Button component={Link} to={`/edit/${emp.id}`} variant="outlined" style={{ marginLeft: "10px" }}>
                    Edit
                  </Button>
                  <Button 
                    onClick={() => handleDeleteClick(emp.id)} 
                    variant="outlined" 
                    color="error" 
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this employee?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={1500} 
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default HomeComponent;
