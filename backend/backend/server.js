require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const admin = require('./firebase-config');

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Middleware to verify Firebase token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Generate resume endpoint
app.post('/generate-resume', verifyToken, async (req, res) => {
  try {
    const { profession, details, photoUrl, resumeType } = req.body;
    const prompt = `
      Generate a professional, error-free ${resumeType} for a ${profession}. Details: ${JSON.stringify(details)}.
      - ATS-friendly with keywords.
      - Structure: Header (photo: ${photoUrl}), Summary, Experience, Skills, Education.
      - Quantify achievements, optimize for interviews.
      - Format as Markdown.
      - Add: 'This ${resumeType} boosts interview chances.'
    `;
    const result = await model.generateContent(prompt);
    const generated = result.response.text();
    res.json({ resume: generated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Generation failed' });
  }
});

// Photo upload endpoint
app.post('/upload-photo', verifyToken, async (req, res) => {
  // Use Firebase Storage for upload (simplified)
  const bucket = admin.storage().bucket();
  // Implement upload logic here (e.g., via multer if needed)
  res.json({ url: 'uploaded-photo-url' }); // Placeholder
});

app.listen(process.env.PORT, () => console.log(`Server on port ${process.env.PORT}`));
