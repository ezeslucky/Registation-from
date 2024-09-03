const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')

const port = process.env.PORT || 8080
dotenv.config()

const app = express();

const username = process.env.MONGODB_USERNAME
const password = process.env.MONGODB_PASSWOARD
// Connect to MongoDB
mongoose.connect(`mongodb+srv://${username}:${password}@registration.bppeg.mongodb.net/?retryWrites=true&w=majority&appName=registration`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Create a schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// Create a model
const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/register',async (req, res) => {
    // const newUser = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });

    // newUser.save((err) => {
    //     if (err) {
    //         console.log(err);
    //         res.send('Error occurred');
    //     } else {
    //         res.send('Registration successful');
    //     }
    // });


    try{
        const {name,email,password} = req.body

        const registationdata = new registation({
            name: String,
            email: String,
            password: String
        });
        await registationdata.save()
        res.redirect("/sucess")
    }
    catch(error){
res.redirect("error")
    }
});

app.get("/sucess",(req,res)=>{
    res.sendFile(__dirname + "/public/sucess.html")
})
app.get("/error",(req,res)=>{
    res.sendFile(__dirname + "/public/error.html")
})

// Start the server
app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
});
