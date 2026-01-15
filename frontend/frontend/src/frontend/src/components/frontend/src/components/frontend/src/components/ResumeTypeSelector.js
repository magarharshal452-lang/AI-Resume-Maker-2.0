import React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';

function ResumeTypeSelector({ onNext }) {
  const [type, setType] = React.useState('');

  return (
    <div>
      <Typography variant="h6">Choose Resume or CV</Typography>
      <Card onClick={() => setType('Resume')} style={{ margin: 10, cursor: 'pointer' }}>
        <CardContent><Typography>Resume (Concise)</Typography></CardContent>
      </Card>
      <Card onClick={() => setType('CV')} style={{ margin: 10, cursor: 'pointer' }}>
        <CardContent><Typography>CV (Detailed)</Typography></CardContent>
      </Card>
      {type && <Button onClick={onNext} variant="contained">Next</Button>}
    </div>
  );
}

export default ResumeTypeSelector;
