const express = require('express')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const mongoose = require('mongoose');
const cors=require('cors')
require('dotenv').config()

const app=express()
app.use(express.json())
app.use(cors())

const dbURI = process.env.MONGODB_URI;
const port = process.env.PORT;

const initializeDBandServer = async () => {
    try {
      await mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (error) {
      console.log(`DB Error: ${error.message}`);
      process.exit(1);
    }
  };

initializeDBandServer();

// Define the user schema
const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
  });
  
  // Create a Mongoose model for the user
  const User = mongoose.model('User', userSchema);

  function isPasswordStrong(password){
    // Using regular expressions(regex) to validate password
    const length=/.{8,}/;            // At least 8 characters
    const capital=/[A-Z]/;           // At least one uppercase letter
    const lowerCase=/[a-z]/;         // At least one lowercase letter
    const specialCharacter=/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;  // At least one special character
    const number=/[0-9]/;            // At least one number

    const isLengthValid = length.test(password);
    const hasCapital = capital.test(password);
    const hasLowerCase = lowerCase.test(password);
    const hasSpecialChar = specialCharacter.test(password);
    const hasNumber = number.test(password);

    return(isLengthValid && hasCapital && hasLowerCase && hasSpecialChar && hasNumber);
}

app.post('/sign-up', async (request, response) => {
    const { email, username, password } = request.body;
  
    // Check for empty details
    if (email==='' || username===''){
        return response.status(400).json({error:"Details shouldn't be empty"});
    }

    // Check for valid email
    if (!email.includes('@gmail.com')){
        return response.status(400).json({error:"Invalid email"});
    }

    // Check for password strength
    if (!isPasswordStrong(password)){
        return response.status(400).json({error:'password must be at least 8 characters and one capital,lower,special character & number'});
    }
    
  
    try {
      const existingUser = await User.findOne({ username });
  
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const newUser = new User({
          email,
          username,
          password: hashedPassword,
        });
  
        await newUser.save();
        response.status(201).json({ msg: 'Signed up successfully' });
      } else {
        response.status(400).json({ error: 'Username already exists' });
      }
    } catch (error) {
      console.error('Error during sign-up', error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  });
  
app.post('/login', async (request, response) => {
    const { username, password } = request.body;
  
    try {
      const user = await User.findOne({ username });
  
      if (user) {
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (isPasswordMatched) {
          response.status(200).json({ msg: 'Login successful' });
        } else {
          response.status(400).json({ error: 'Username and password do not match' });
        }
      } else {
        response.status(404).json({ error: 'Username not found' });
      }
    } catch (error) {
      console.error('Error during login', error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  });