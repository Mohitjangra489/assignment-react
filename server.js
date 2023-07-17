const express=require('express');
const jwt =require('jsonwebtoken');
const cors=require('cors');
const app=express();
const JWT_SECRET_KEY="SECRET_KEY";

 app.use(express.json());
 app.use(express());
 app.use(express.urlencoded({extended:true}));

app.use(cors());

const initdb = require('./public/database/init');
initdb();
const usermodel = require('./public/database/users');

let jwttoken="";    

app.get('/getlogin',verifytoken,async (req,res)=>{
 let token=req.query.token;


})

app.post('/login', async function(req,res){ 
    console.log(req.body);
    const user=req.body;
    let data=await usermodel.find(user);
    console.log(data);
    if(data!="")
    {
        if(user.email==data[0].email && user.password==data[0].password){
            console.log("login data is correct");
            jwt.sign({user},JWT_SECRET_KEY,{expiresIn:'600s'},(error,token)=>{
                console.log(token);
                jwttoken=token;
                res.json({message:"login successful!!!",token:token});
            });
           
        }
        else
        {
            res.json({message:"invalid credentials!.Please enter correct details",token:""});
        };
    }
    else
    {
        res.json({message:"invalid credentials!.Please enter correct details",token:""});
    }
   
    
  });

app.post('/home',(req,res)=>{
    // console.log(req.header,req.body);
    console.log(req.headers["authorization"].split("bearer")[1]);
    res.json("success granted");
    
})


app.post('/signup', function(req,res){

    let {username,email,password}=req.body;
    let user={
        username,
        email,
        password
    }
    console.log(user);

    let newuser= new usermodel(user);
     newuser.save();
    res.json("signup successfully done!.Please login");
});

app.get('/getusers',async(req,res)=>{

    let users= await usermodel.find({});
    // console.log(users)
    res.json(users);
})

app.get('/getuserdetail',async(req,res)=>{
    let id=req.query.id;  
    console.log(id);
    let data=await usermodel.findOne({_id:id});
    console.log(data);
    res.json(data);
});

app.get('/updateuserdetail',async(req,res)=>{
    let {id,name,email}=req.query;
    console.log({username:name,email:email});
    let filter={"_id":id};
    let update={"$set":{"username":name,"email":email}};
    let updation= await usermodel.findOneAndUpdate(filter,update);
    console.log(updation);
    res.json("done");
})

app.get('/deleteuser',async(req,res)=>{
  let id=req.query.id;
  let deleted=await usermodel.findByIdAndDelete({"_id":id});


  res.json("deleted!");

})


function verifytoken(req,res,next){
    let token=JSON.parse(req.query.token);
    console.log("inside verifytoken=",token);
    if(token!="")
    {
        jwt.verify(token,JWT_SECRET_KEY,(error,decoded)=>{
            if(error)
            {
                res.json(error);
            }
            console.log(decoded);
            req.user=decoded.user;
            res.json({"message":res.user});
            next();
            });
    }
    else
    {
        res.status(401);
    }
   
    }


app.listen(8000,()=>{
    console.log("server connected successfully at port 8000");
})