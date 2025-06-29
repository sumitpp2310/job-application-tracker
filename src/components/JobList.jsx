import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  TextField,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  Alert,
} from "@mui/material";
import { db } from "../firebase/firestore";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const JobList = () => {
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedJob, setEditedJob] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (currentUser) fetchJobs();
  }, [currentUser]);

  const fetchJobs = async () => {
    const q = query(collection(db, "jobs"), where("userId", "==", currentUser.uid));
    const snapshot = await getDocs(q);
    const jobsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setJobs(jobsData);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "jobs", id));
    fetchJobs();
    setOpenSnackbar(true);
  };

  const handleEditClick = (job) => {
    setEditingId(job.id);
    setEditedJob({
      company: job.company,
      role: job.role,
      status: job.status,
    });
  };

  const handleSaveEdit = async (id) => {
    await updateDoc(doc(db, "jobs", id), {
      ...editedJob,
    });
    setEditingId(null);
    fetchJobs();
  };

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Your Applications
      </Typography>

      <Grid container spacing={2}>
        {jobs.map((job) => (
          <Grid item xs={12} md={6} key={job.id}>
            <Card>
              <CardContent>
                {editingId === job.id ? (
                  <>
                    <TextField
                      label="Company"
                      fullWidth
                      value={editedJob.company}
                      onChange={(e) =>
                        setEditedJob({ ...editedJob, company: e.target.value })
                      }
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      label="Role"
                      fullWidth
                      value={editedJob.role}
                      onChange={(e) =>
                        setEditedJob({ ...editedJob, role: e.target.value })
                      }
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      select
                      label="Status"
                      fullWidth
                      value={editedJob.status}
                      onChange={(e) =>
                        setEditedJob({ ...editedJob, status: e.target.value })
                      }
                      sx={{ mb: 2 }}
                    >
                      {["Applied", "Interviewed", "Offered", "Rejected"].map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>

                    <Button
                      variant="contained"
                      onClick={() => handleSaveEdit(job.id)}
                      sx={{ mr: 1 }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography variant="h6">{job.company}</Typography>
                    <Typography variant="subtitle1">{job.role}</Typography>
                    <Chip
                      label={job.status}
                      color={
                        job.status === "Applied"
                          ? "primary"
                          : job.status === "Interviewed"
                          ? "warning"
                          : job.status === "Offered"
                          ? "success"
                          : "error"
                      }
                      sx={{ mt: 1 }}
                    />

                    {job.resumeURL && (
                      <Button
                        href={job.resumeURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        size="small"
                        sx={{ mt: 2, display: "block" }}
                      >
                        View Resume
                      </Button>
                    )}

                    <Box mt={2}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleEditClick(job)}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(job.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Job deleted!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default JobList;
