import React from 'react'
import {Link} from 'react-router-dom';

function Home() {
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
