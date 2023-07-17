import React from 'react'
import { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';

function Signup() {
    let navigate=useNavigate();

    const [user, setuser] = useState("");
    const [mail, setmail] = useState("");
    const [pass, setpass] = useState("");

  async function handlesignup(event) {
        event.preventDefault();
        console.log("inside handlesignup");
        if (user != "" && mail != "" && pass != "") {
            let obj = {
                username: user, email: mail, password: pass
            }
            console.log(obj);

            let res = await fetch('http://localhost:8000/signup',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                    body: JSON.stringify(obj)
                });

            let resJson = await res.json();
            console.log(resJson);
            alert(resJson);
            navigate('/login');

            if (res.status === 200) {
                setuser("");
                setmail("");
                setpass("");
                console.log("yes signup state cleared");
            }
        }
    };

    return (
      
        <div className='signupcontainer'>
           
            <form className="signupform">
            <h1 style={{textDecoration: "underline"}}>Signup Here</h1>
                <label >Username</label>
                <input type='text' value={user} onChange={(e) => { setuser(e.target.value) }} />
                <label >Email</label>
                <input type='text' value={mail} onChange={(e) => { setmail(e.target.value) }} />
                <label>Password</label>
                <input type='text' value={pass} onChange={(e) => { setpass(e.target.value) }} />

                <button type='submit' onClick={handlesignup}>Signup</button>
                <div>
                <Link to='/login'><button type='button'>Login</button></Link>
            </div>
            </form>
           
        </div>
    )
}

export default Signup
