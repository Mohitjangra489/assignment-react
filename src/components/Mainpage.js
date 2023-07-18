import React from 'react'
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

// import { useResolvedPath } from 'react-router-dom';

function Mainpage() {
let navigate=useNavigate();


    const [users, setusers] = useState([]);
    const [name, setname] = useState();
    const [email, setemail] = useState();
    const [editid, seteditid] = useState(-1);

    let getusers=()=>{
        fetch('http://localhost:8000/getusers')             
        .then(res => res.json())
        .then(data => { setusers(data) });
    }

    let handleedit =async(id) => {
        seteditid(id);
        console.log(id,editid);
        await fetch(`http://localhost:8000/getuserdetail/?id=${id}`)
        .then(res => res.json())
        .then(data => { 
            console.log(data);
            setname(data.username) ;
            setemail(data.email);
        });
        console.log(name);
    };

    let handleupdate = async() => {
        console.log(name,email);
           await fetch(`http://localhost:8000/updateuserdetail/?id=${editid}&name=${name}&email=${email}`)
            .then(res => res.json())
            .then(data => { 
            getusers();
             console.log(data);
            });
        seteditid(-1);
      

    };

    let handledelete =async(id) => {
      console.log(id);
      await fetch(`http://localhost:8000/deleteuser/?id=${id}`)
      .then(res => res.json())
      .then(data => { 
          console.log(data);
      });

      let row=document.getElementById(id);
      row.style.display="none";


    }

     let handlelogout=()=>{
      localStorage.clear();
       navigate('/login');

    }


    let interval= setInterval(()=>{
        console.log("setinterval method");
        async function check()
        {
             fetch(`http://localhost:8000/getlogin/?token=${JSON.stringify(localStorage.getItem("Token"))}`)             
            .then(res => res.json())
            .then(data => { 
                console.log(data) ;
                if(data.message=='jwt expired')
                { 
                //  localStorage.clear();
                  clearInterval(interval);
                 navigate('/login'); 

                }
                else if(data.message=='jwt must be provided'){
                    clearInterval(interval);
                 navigate('/login');
                
                }
                else
                {   
                    navigate('/mainpage');
                }
            });
        }
      check();
    },15000);


    // useEffect(()=>{
        
    //     async function check()
    //     {
    //          fetch(`http://localhost:8000/getlogin/?token=${JSON.stringify(localStorage.getItem("Token"))}`)             
    //         .then(res => res.json())
    //         .then(data => { 
    //             console.log(data) ;
    //             if(data.message=='jwt expired')
    //             { 
    //             //  localStorage.clear();
    //               clearInterval(interval);
    //              navigate('/login'); 

    //             }
    //             else if(data.message=='jwt must be provided'){
    //                 clearInterval(interval);
    //              navigate('/login');
                
    //             }
               
    //         });
    //     }
    //   check();
    // })

    useEffect(() => {
       getusers();

    },[]);

  
    const tablerows = users.map((user, index) => {
        return (
            user._id === editid ?
                <tr  key={index}>
                    <td><input type='text' value={name} onChange={(e)=>{setname(e.target.value)}}></input></td>
                    <td><input type='text' value={email} onChange={(e)=>{setemail(e.target.value)}}></input></td>
                    <td><button onClick={handleupdate}>Update</button></td>
                </tr>
                :
                <tr id={user._id} key={index}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td><button onClick={()=>{handleedit(user._id)}} >Edit</button></td>
                    <td><button onClick={()=>{handledelete(user._id)}}>Delete</button></td> 
                </tr>
        )

    });

    return (
        <>
            <div className='tablecontainer'>
          
                <table className='table'>
                   
                    <thead>
                        <tr style={{backgroundColor: "#f0f0f0"}}>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tablerows}
                    </tbody>
                </table>
            </div>
             <div>
                <button onClick={handlelogout}>Logout</button>
            </div>
        </>
    )


}



export default Mainpage;
