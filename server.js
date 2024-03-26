const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

// Check for DB connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Schema
const registrationSchema = new mongoose.Schema({
  companyName: String,
  adminName: String,
  phoneNumber: String,
  adminEmail: String,
  experience: Number,
  proof1: String,
  proof2: String,
  proof3: String,
  
});

const Registration = mongoose.model('Registration', registrationSchema);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// POST route to save form data
app.post('/register', (req, res) => {
  // Convert agreeTerms to boolean
  req.body.agreeTerms = req.body.agreeTerms === 'on';

  // Ensure agreeTerms is always a boolean
  if (!req.body.agreeTerms) {
    req.body.agreeTerms = false;
  } else {
    req.body.agreeTerms = true;
  }

  const newRegistration = new Registration(req.body);
  newRegistration.save()
    .then(() => res.json({ message: 'Registration successful' }))
    .catch((err) => res.status(400).send('Registration failed: ' + err));
});




// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));

// Submit form using AJAX
$('form').submit(function(event) {
  event.preventDefault();
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/register',
    data: $(this).serialize(),
    success: function(response) {
      alert(response.message);
    },
    error: function(xhr, status, error) {
      alert('Registration failed: ' + xhr.responseText);
    }
  });
});

