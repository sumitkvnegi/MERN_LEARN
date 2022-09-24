const express = require("express");
const path = require("path")
const app = express();
const hbs = require("hbs");

require("./db/conn");
const Register = require("./models/registers");

const PORT = process.env.PORT || 3000;

const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("view engine", "hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/register",(req,res)=>{
    res.render("register");
})

app.post("/register",async(req,res)=>{
    try{
        /* console.log(req.body.fname) */
        const password = req.body.password;
        const cpassword = req.body.confirmPassword;
        if(password===cpassword){
            const registerUser = new Register({
                firstname:req.body.fname,
                lastname:req.body.lname,
                email:req.body.email,
                phone:req.body.phone,
                age:req.body.age,
                password:req.body.password,
                confirmpassword:req.body.confirmPassword
            });

            const register = await registerUser.save();
            res.status(201).render("index");
        }else{
            res.send("password not matched");
        }
    }catch(e){
        res.status(400).send(e);
    }
})

app.listen(PORT,()=>{
    console.log(`server is running at port number ${PORT}`);
})