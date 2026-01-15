import React from 'react';
import { TextField, Button } from '@mui/material';

function ProfessionSelector({ onNext }) {
  const [profession, setProfession] = React.useState('');

  return (
    <div>
      <TextField label="Profession" fullWidth value={profession} onChange={(e) => setProfession(e.target.value)} />
      <Button onClick={() => onNext(profession)} variant="contained">Next</Button>
    </div>
  );
}

export default ProfessionSelector;
