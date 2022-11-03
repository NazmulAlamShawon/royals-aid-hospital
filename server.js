const  express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const port = process.env.PORT || 3000;
const User = require('./src/models/Users');
// require('./src/db/conn');
app.use(express.static(path.join(__dirname, 'views')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));



//  databse connected

const url =  "mongodb+srv://admin:RWdfvd6TXYQmhWmp@cluster0.uojjyly.mongodb.net/userRegistration?retryWrites=true&w=majority"

async  function conncet(){
   try {
    await mongoose.connect(url)
    console.log("connect to mongodb")
   }catch   (error) {
       console.error(error);
   }
}
conncet();

// bodyparser
app.use(express.urlencoded({extended : false}))

// get mthod 
app.get('/login',(req,res) => res.render('login'));
app.get('/register',(req,res) => res.render('register'));
app.get('/index',(req,res) => res.render('index'));


app.get('/', (req, res) => {
  res.render('index', {foo: 'FOO'});
});
// post method


app.post('/register', (req,res) => {
    const { username,companyid,phone,email,password} = req.body;
      let errors= [];
    //  check required filed
    if(!username ||!companyid || !phone || !email || !password ){
          errors.push({message: 'please fill in all filed'})
        }

        // check pass length
        if(password.length < 8){
             errors.push({message:'password should be at least  8  characters'}) 
        }
        // user limition 
        

        // 
        if(errors.length> 0 ){
          res.render('register', {
             errors,  
             username,
             companyid,
             phone,
             email,
             password

          });          
        }
         else {
           // validation pass
           User.findOne({email:email})
           .then(user => {
            if(user) {
              //user exist 
              errors.push({msg:'Email is already register'})
              res.render('register', {
                errors,  
                username,
                companyid,
                phone,
                email,
                password
   
             });   
            } else{
                const newUser = new User({
                  username,
                  companyid,
                  phone,
                  email,
                  password
                }) 
              //  hass pasword 
              bcrypt.genSalt(10, (err,salt) =>
              bcrypt.hash(newUser.password,salt,(err,hash) => 
              {
                    if(err)throw err;
                    //set passwod hass
                    newUser.password = hash;
                    //save password
                    newUser.save()
                    .then(user => {
                      res.redirect('/')
                    })
              }))
            }
           })
        }

  
})





app.listen (port, () => {
    console.log(`server is runing at port no ${port} `)
})