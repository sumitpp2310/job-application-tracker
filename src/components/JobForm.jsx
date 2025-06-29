import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Snackbar,
  Alert,
  Typography,
  Chip,
} from "@mui/material";
import { db } from "../firebase/firestore";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import ResumeUpload from "./ResumeUpload";
import { useAuth } from "../context/AuthContext";

const JobForm = () => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [resumeURL, setResumeURL] = useState("");
  const { currentUser } = useAuth();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Please log in first.");
      return;
    }

    try {
      await addDoc(collection(db, "jobs"), {
        userId: currentUser.uid,
        company,
        role,
        status,
        resumeURL,
        createdAt: serverTimestamp(),
      });

      setCompany("");
      setRole("");
      setStatus("Applied");
      setResumeURL("");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error saving job:", error);
      alert("Failed to save job.");
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 3,
          p: 3,
          boxShadow: 2,
          borderRadius: 2,
          backgroundColor: "#fafafa",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add New Job
        </Typography>

        <TextField
          label="Company Name"
          fullWidth
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Role"
          fullWidth
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          select
          label="Status"
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ mb: 2 }}
        >
          {["Applied", "Interviewed", "Offered", "Rejected"].map((option) => (
            <MenuItem key={option} value={option}>
              <Chip
                label={option}
                color={
                  option === "Applied"
                    ? "primary"
                    : option === "Interviewed"
                    ? "warning"
                    : option === "Offered"
                    ? "success"
                    : "error"
                }
              />
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ mb: 2 }}>
          <ResumeUpload onUpload={(url) => setResumeURL(url)} />
          {resumeURL && (
            <Typography variant="body2" color="green" mt={1}>
              ✅ Resume uploaded
            </Typography>
          )}
        </Box>

        <Button type="submit" variant="contained" fullWidth>
          Save Job
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          Job saved successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default JobForm;
