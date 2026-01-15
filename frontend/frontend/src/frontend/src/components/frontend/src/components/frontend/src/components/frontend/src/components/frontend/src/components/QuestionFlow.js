import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

function QuestionFlow({ profession, onComplete }) {
  const [details, setDetails] = useState({});

  const questions = [
    'List your skills',
    'Describe your experience',
    // Add more based on profession
  ];

  const handleChange = (q, value) => setDetails({ ...details, [q]: value });

  return (
    <div>
      {questions.map((q, i) => (
        <TextField key={i} label={q} fullWidth margin="normal" onChange={(e) => handleChange(q, e.target.value)} />
      ))}
      <Button onClick={() => onComplete(details)} variant="contained">Next</Button>
    </div>
  );
}

export default QuestionFlow;
