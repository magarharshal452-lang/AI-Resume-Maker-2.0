import React, { useState } from 'react';
import { Button } from '@mui/material';

function PhotoUpload({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    // Integrate with Firebase Storage or backend
    const formData = new FormData();
    formData.append('photo', file);
    const res = await fetch('/upload-photo', { method: 'POST', body: formData });
    const { url } = await res.json();
    onUpload(url);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <Button onClick={handleUpload} variant="contained">Upload Photo</Button>
    </div>
  );
}

export default PhotoUpload;
