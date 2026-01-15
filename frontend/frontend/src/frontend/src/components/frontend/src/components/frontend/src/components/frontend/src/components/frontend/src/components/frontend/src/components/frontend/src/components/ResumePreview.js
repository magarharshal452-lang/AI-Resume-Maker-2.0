import React, { useState } from 'react';
import { Button } from '@mui/material';
import ReactMarkdown from 'react-markdown';

function ResumePreview({ profession, details, photoUrl, resumeType }) {
  const [resume, setResume] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const token = await auth.currentUser.getIdToken();
    const res = await fetch('/generate-resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ profession, details, photoUrl, resumeType }),
    });
    const data = await res.json();
    setResume(data.resume);
    setLoading(false);
  };

  return (
    <div>
      <Button onClick={generate} disabled={loading} variant="contained">
        {loading ? 'Generating...' : 'Generate Resume'}
      </Button>
      {resume && <ReactMarkdown>{resume}</ReactMarkdown>}
    </div>
  );
}

export default ResumePreview;
