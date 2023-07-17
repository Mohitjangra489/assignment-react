import React from 'react';
import { useState,useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';


function Login() {
    let navigate=useNavigate();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

     async function handlelogin(event) {
        event.preventDefault();
        console.log("inside handlelogin");
         
        if (email != "" && password != ""){
            let obj = { email: email, password: password };
            console.log(obj);

            let res = await fetch('http://localhost:8000/login',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                    body: JSON.stringify(obj)
                });

            let resJson = await res.json();
            let token=resJson.token;
            console.log(token);
            if(token!="")
            {
                localStorage.setItem("Token",token);
                // console.log(resJson); 
                navigate('/mainpage');     
            }
            else
            {
             alert(resJson.message);
            }
           
            if(res.status===200)
                {
                    setemail("");
                    setpassword("");
                //   console.log("yes login state cleared");
                }
        }
       
    };

     async function check()
    {
         fetch(`http://localhost:8000/getlogin/?token=${JSON.stringify(localStorage.getItem("Token"))}`)             
        .then(res => res.json())
        .then(data => { 
            console.log(data) ;
            if(data.message='jwt expired')
            { 
             navigate('/login');
            }
            else
            {   
                navigate('/mainpage');
            }
        });
    }
    useEffect(()=>{
      check();
    },[]);



    return (
        <div className='logincontainer'>
            <form className="loginform">
            <h1 style={{textDecoration: "underline"}}>Login Here</h1>
                <label >Email</label>
                <input type='text' value={email} onChange={(e) => { setemail(e.target.value) }} />
                <label>Password</label>
                <input type='text' value={password} onChange={(e) => { setpassword(e.target.value) }} />
                <button type='submit' onClick={handlelogin}>Login</button>
                <div>
                <Link to='/signup'><button type='button'>signup</button></Link>
            </div>
            </form>
            
        </div>
    )
}

export default Login;
