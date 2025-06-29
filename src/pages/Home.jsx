import React from "react";
import { Typography, Container } from "@mui/material";
import JobForm from "../components/JobForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/auth";

const Home = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please log in to continue.</p>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome, {user.displayName}
      </Typography>
      <JobForm user={user} />
    </Container>
  );
};

export default Home;
