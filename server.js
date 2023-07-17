const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const JWT_SECRET_KEY = "SECRET_KEY";
const bcrypt = require('bcrypt');
const saltRounds = 10;


app.use(express.json()); ``
app.use(express());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const initdb = require('./public/database/init');
initdb();
const usermodel = require('./public/database/users');


//Routes
app.get('/getlogin', verifytoken, async (req, res) => {
    let token = req.query.token;
});

app.get('/', verifytoken, (req, res) => {

});

app.post('/login', async function (req, res) {
    console.log(req.body);
    const user = req.body;
    let data = await usermodel.findOne({ email: req.body.email });
    console.log(data);

    if (data != null) {
        let myPlaintextPassword = user.password;
        let hash = data.password;
        let password;
        bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
            console.log("result", result);
            password = result;
            console.log(password);

            if (user.email == data.email && result) {
                console.log("login data is correct");
                jwt.sign({ user }, JWT_SECRET_KEY, { expiresIn: '600s' }, (error, token) => {
                    console.log(token);
                    jwttoken = token;
                    res.json({ message: "login successful!!!", token: token });
                });

            }
            else {
                res.json({ message: "invalid credentials!.Please enter correct details", token: "" });
            };
        });

    }
    else {
        res.json({ message: "User not found!", token: "" });
    }


});

app.get('/mainpage', verifytoken, (req, res) => {
});

app.post('/home', (req, res) => {
    // console.log(req.header,req.body);
    console.log(req.headers["authorization"].split("bearer")[1]);
    res.json("success granted");

})


app.post('/signup', function (req, res) {

    let { username, email } = req.body;

    let myPlaintextPassword = req.body.password;

    bcrypt.hash(myPlaintextPassword, saltRounds, async function (err, hash) {
        let hashedpassword = hash;

        let data = await usermodel.findOne({ email: email });
        console.log(data);

        if (data != null) {
            res.json({ message: "user already exist" });
        }
        else {
            console.log("2");

            let user = {
                username: username,
                email: email,
                password: hashedpassword
            }
            console.log(user);
            let newuser = new usermodel(user);
            newuser.save();
            res.json({ message: "signup successfully done!.Please login" });

        }

    })


});

app.get('/getusers', async (req, res) => {

    let users = await usermodel.find({});
    // console.log(users)
    res.json(users);
})

app.get('/getuserdetail', async (req, res) => {
    let id = req.query.id;
    console.log(id);
    let data = await usermodel.findOne({ _id: id });
    console.log(data);
    res.json(data);
});

app.get('/updateuserdetail', async (req, res) => {
    let { id, name, email } = req.query;
    console.log({ username: name, email: email });
    let filter = { "_id": id };
    let update = { "$set": { "username": name, "email": email } };
    let updation = await usermodel.findOneAndUpdate(filter, update);
    console.log(updation);
    res.json("done");
})

app.get('/deleteuser', async (req, res) => {
    let id = req.query.id;
    let deleted = await usermodel.findByIdAndDelete({ "_id": id });

    res.json("deleted!");

})


function verifytoken(req, res, next) {
    let token = JSON.parse(req.query.token);
    console.log("inside verifytoken=", token);
    if (token != "") {
        jwt.verify(token, JWT_SECRET_KEY, (error, decoded) => {
            if (error) {
                res.json(error);
            }
            else {
                console.log(decoded);
                req.user = decoded.user;
                res.json({ "message": res.user });
                next();
            }

        });
    }
    else {
        res.json.status(401);
    }

}


app.listen(8000, () => {
    console.log("server connected successfully at port 8000");
})
