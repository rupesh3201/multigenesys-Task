import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    emailId: "",
    mobile: "",
    avatar: "",
    country: { value: "", label: "" },
    state: { value: "", label: "" },
    district: { value: "", label: "" },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`
        );
        setEmployee(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee details:", error);
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setEmployee((prevEmployee) => {
      const keys = name.split(".");
      if (keys.length === 2) {
        return {
          ...prevEmployee,
          [keys[0]]: {
            ...prevEmployee[keys[0]],
            [keys[1]]: value,
          },
        };
      }
      return {
        ...prevEmployee,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`,
        employee
      );
      toast.success("Employee updated successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Error updating employee!");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Paper style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <Typography variant="h5" gutterBottom>Edit Employee</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Name" name="name" value={employee.name} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Email" name="emailId" value={employee.emailId} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Mobile" name="mobile" value={employee.mobile} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Avatar URL" name="avatar" value={employee.avatar} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="Country" name="country.label" value={employee.country?.label || ""} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="State" name="state.label" value={employee.state?.label || ""} onChange={handleChange} margin="normal" />
        <TextField fullWidth label="District" name="district.label" value={employee.district?.label || ""} onChange={handleChange} margin="normal" />

        <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: "20px" }}>
          Update Employee
        </Button>
      </form>
      <ToastContainer />
    </Paper>
  );
};

export default EditEmployee;
