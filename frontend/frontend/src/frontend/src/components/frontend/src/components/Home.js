import React, { useState } from 'react';
import { Button } from '@mui/material';
import ResumeTypeSelector from './ResumeTypeSelector';

function Home({ user }) {
  const [step, setStep] = useState(0);

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome, {user.email}!</h1>
      {step === 0 && <ResumeTypeSelector onNext={() => setStep(1)} />}
      {/* Add more steps here as needed */}
    </div>
  );
}

export default Home;
