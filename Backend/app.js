const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path=require('path')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const cors=require('cors')
require('dotenv').config()

const app=express()
app.use(express.json())
app.use(cors())

const dbPath=process.env.DB_PATH;
const port=process.env.PORT || 3004 ;
let db=null;

const initializeDBandServer=async()=>{
    try{
        db=await open({filename:dbPath,driver:sqlite3.Database});
        app.listen(port,()=>{
            console.log(`server is running on port ${port}`);
        })
    }catch(error){
        console.log(`DB Error: ${error.message}`);
        process.exit(1)
    }
}

initializeDBandServer()

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

app.post('/sign-up', async(request,response)=>{
    const {email,username,password}=request.body;

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

    try{
        // Check if username already exists
        const checkUser='SELECT * FROM user WHERE username= ?';
        const dbUser=await db.get(checkUser,[username])

        if (dbUser===undefined){
            // Hash the password
            const hashedPassword=await bcrypt.hash(password,10);

            // Insert the new user into the database
            const createUser = 'INSERT INTO user (email,username,password) VALUES (?,?,?)';
            await db.run(createUser,[email,username,hashedPassword])
            response.status(201).json({msg:'Signed up successfully'});
        }else{
            response.status(400).json({error:'username already exists'});
        }
    }catch(error){
        console.error('Error during sign-up',error);
        return response.status(500).json({ error: 'Internal server error' });
    }
})

app.post('/login', async(request,response)=>{
    const {username,password}=request.body;

    try{
        // check if username exists
        const checkUser='SELECT * FROM user WHERE username=?';
        const dbUser=await db.get(checkUser,[username]);

        if (dbUser===undefined){
            response.status(404).json({error:'username not found'});
        }else{
            // check if password is correct
            const isPasswordMatched=await bcrypt.compare(password,dbUser.password);
            if (isPasswordMatched){
                response.status(200).json({msg:'Login successful'});
            }else{
                response.status(400).json({error:"username and password didn't match"});
            }
        }
    }catch(error){
        console.error('Error during login',error);
        return response.status(500).json({error:'Internal server error'})
    }
})

app.put('/change-password', async(request,response)=>{
    const {username,oldPassword,newPassword}=request.body;

    try{
        // check if username exists
        const checkUser='SELECT * FROM user WHERE username=?';
        const dbUser=await db.get(checkUser,[username]);

        if (dbUser===undefined){
            response.status(404).json({error:'username not found'});
        }else{
            // check if old password match the password in database
            const isPasswordMatched=await bcrypt.compare(oldPassword,dbUser.password);
            if (isPasswordMatched){
                if (isPasswordStrong(newPassword)){
                    const hashedPassword=await bcrypt.hash(newPassword,10);
                    const updatePassword='UPDATE user SET password=? WHERE username=?';
                    await db.run(updatePassword,[hashedPassword,username]);
                    response.status(202).json({msg:'password updated successfully'})
                }else{
                    response.status(400).json({error:'password must be at least 8 characters and one capital,lowercase,special character & number'})
                }
            }else{
                response.status(400).json({error:"username and password did't match"})
            }
        }
    }catch(error){
        console.error('Error during login',error);
        return response.status(500).json({error:'Internal server error'})
    }

})

app.get('/users',async (request,response)=>{
    const users=await db.all('SELECT * FROM user');
    response.json(users);
})

app.get('/api/songs', async (req, res) => {
  try {
    console.log('Request received for /api/songs');
    const songs = await db.all('SELECT * FROM songs');
    console.log('Songs retrieved from the database:', songs);
    res.json(songs);
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/songs', async (request,response)=>{
    //testing repo changes
    try {
        console.log('Request received for /api/songs');
        const songs = await db.all('SELECT * FROM songs');
        console.log('Songs retrieved from the database:', songs);
        res.json(songs);
      } catch (error) {
        console.error('Error fetching songs:', error);
        res.status(500).json({ error: error.message });
      }
})