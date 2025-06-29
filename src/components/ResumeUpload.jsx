import React, { useRef } from "react";
import { Button, Typography, Box } from "@mui/material";
import UploadIcon from "@mui/icons-material/UploadFile";

const ResumeUpload = ({ onUpload }) => {
  const fileInputRef = useRef();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "jobtracker_resume");
    formData.append("folder", "resume");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/sumitcloud123/raw/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        onUpload(data.secure_url);
        console.log("Cloudinary response:", data);
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
    }
  };

  return (
    <Box>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleUpload}
        style={{ display: "none" }}
      />

      <Button
        variant="outlined"
        startIcon={<UploadIcon />}
        onClick={() => fileInputRef.current.click()}
      >
        Upload Resume (PDF)
      </Button>

      <Typography variant="body2" color="text.secondary" mt={1}>
        Only PDF file. Max 5MB.
      </Typography>
    </Box>
  );
};

export default ResumeUpload;
