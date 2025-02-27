import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography, Button, CircularProgress, Paper, Avatar } from "@mui/material";
import "./EmployeeDetails.css";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployeeDetails();
  }, []);

  const fetchEmployeeDetails = async () => {
    try {
      const response = await axios.get(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`);
      setEmployee(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employee details:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <CircularProgress style={{ display: "block", margin: "auto", marginTop: "20px" }} />;
  }

  return (
    <div className="employee-details-container">
      <Paper elevation={3} className="employee-card">
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Employee Details
            </Typography>

            {/* Avatar */}
            <Avatar 
              src={employee.avatar} 
              alt={employee.name} 
              sx={{ width: 100, height: 100, margin: "auto", marginBottom: "10px" }} 
            />

            <Typography variant="body1"><strong>ID:</strong> {employee.id}</Typography>
            <Typography variant="body1"><strong>Name:</strong> {employee.name}</Typography>
            <Typography variant="body1"><strong>Email:</strong> {employee.emailId}</Typography>
            <Typography variant="body1"><strong>Phone:</strong> {employee.mobile || "N/A"}</Typography>

            {/* Country, State, and District */}
            <Typography variant="body1"><strong>Country:</strong> {employee.country?.label || "N/A"}</Typography>
            <Typography variant="body1"><strong>State:</strong> {employee.state?.label || "N/A"}</Typography>
            <Typography variant="body1"><strong>District:</strong> {employee.district?.label || "N/A"}</Typography>

            <Button 
              variant="contained" 
              component={Link} 
              to="/" 
              style={{ marginTop: "20px" }}
            >
              Back to List
            </Button>
          </CardContent>
        </Card>
      </Paper>
    </div>
  );
};

export default EmployeeDetails;
