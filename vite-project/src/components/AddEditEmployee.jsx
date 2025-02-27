import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Paper, Typography, Snackbar, Alert } from "@mui/material";
import "./AddEmployee.css";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    emailId: "",
    mobile: "",
    country: "",
    state: "",
    district: "",
  });

  const [open, setOpen] = useState(false); // Snackbar state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee", employee);
      setOpen(true); // Show success toast
      setTimeout(() => navigate("/"), 1500); // Redirect after 1.5 sec
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <Paper elevation={3} className="form-container">
      <Typography variant="h5" className="form-title">
        Add Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          required
          value={employee.name}
          onChange={handleChange}
          className="input-field"
        />
        <TextField
          label="Email"
          name="emailId"
          type="email"
          variant="outlined"
          fullWidth
          required
          value={employee.emailId}
          onChange={handleChange}
          className="input-field"
        />
        <TextField
          label="Phone"
          name="mobile"
          type="tel"
          variant="outlined"
          fullWidth
          required
          value={employee.mobile}
          onChange={handleChange}
          className="input-field"
        />
        <TextField
          label="Country"
          name="country"
          variant="outlined"
          fullWidth
          required
          value={employee.country}
          onChange={handleChange}
          className="input-field"
        />
        <TextField
          label="State"
          name="state"
          variant="outlined"
          fullWidth
          required
          value={employee.state}
          onChange={handleChange}
          className="input-field"
        />
        <TextField
          label="District"
          name="district"
          variant="outlined"
          fullWidth
          required
          value={employee.district}
          onChange={handleChange}
          className="input-field"
        />
        
        <div className="button-group">
          <Button variant="contained" type="submit">
            Add Employee
          </Button>
          <Button variant="outlined" onClick={() => navigate("/")}>
            Cancel
          </Button>
        </div>
      </form>

      {/* ✅ Snackbar for Success Message */}
      <Snackbar 
        open={open} 
        autoHideDuration={1500} 
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setOpen(false)} severity="success" variant="filled">
          Employee added successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default AddEmployee;
