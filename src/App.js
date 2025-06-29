import React from "react";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import { AuthProvider } from "./context/AuthContext";
import { loginWithGoogle, logout } from "./firebase/auth";
import { Button, Typography, Box } from "@mui/material";
import { useAuth } from "./context/AuthContext";

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
      <Typography variant="h6">Welcome, {currentUser?.displayName || "Guest"}</Typography>
      {currentUser ? (
        <Button onClick={logout} variant="outlined">Logout</Button>
      ) : (
        <Button onClick={loginWithGoogle} variant="contained">Login with Google</Button>
      )}
    </Box>
  );
};

function App() {
  return (
    <AuthProvider>
      <Header />
      <Box maxWidth="md" mx="auto" mt={2} p={2}>
        <JobForm />
        <JobList />
      </Box>
    </AuthProvider>
  );
}

export default App;
