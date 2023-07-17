import React from 'react'
import {Link,useNavigate} from 'react-router-dom';
import { useEffect } from 'react';


function Home() {

 let navigate=useNavigate();
  useEffect(()=>{
    async function check()
    {
         fetch(`http://localhost:8000/?token=${JSON.stringify(localStorage.getItem("Token"))}`)             
        .then(res => res.json())
        .then(data => { 
            console.log(data) ;
            if(data.message='jwt expired')
            {
              //  localStorage.clear();
             navigate('/login');
            }
            else
            {   
                navigate('/mainpage');
            }
        });
    }
    check();
  },[]);

  return (
    <div className='homeComponent'>
      <h1 style={{backgroundColor:"white",marginTop:"0px"}}>Welcome to the home page</h1>
  <div className='linkcontainer'>
    <Link to='/login' ><button>Login</button></Link>
    <Link to='/signup'><button>Signup</button></Link>
    {/* <Link to='/admin'><button>Admin</button></Link> */}
  </div>
  </div>
  )
}

export default Home
