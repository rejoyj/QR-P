const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  // Start server after MongoDB connection is established
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Schema
const registrationSchema = new mongoose.Schema({
  companyName: String,
  name: String,
  email: String,
  experience: Number,
  companyProof: Buffer,
  offerLetterProof: Buffer,
  idProof: Buffer,
  terms: Boolean
});

const Registration = mongoose.model('Registration', registrationSchema);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// POST route to save form data
app.post('/register', (req, res) => {
  // Convert agreeTerms to boolean
  req.body.terms = req.body.terms === 'on';

  const newRegistration = new Registration({
    companyName: req.body.companyName,
    name: req.body.name,
    email: req.body.email,
    experience: req.body.experience,
    companyProof: req.body.companyProof,
    offerLetterProof: req.body.offerLetterProof,
    idProof: req.body.idProof,
    terms: req.body.terms
  });

  newRegistration.save()
    .then(() => res.json({ message: 'Registration successful' }))
    .catch((err) => res.status(400).send('Registration failed: ' + err));
});
