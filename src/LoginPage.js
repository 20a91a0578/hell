import React from 'react'
import {useState } from 'react';
import { useEffect } from 'react';
import App from './App';
import './signup.css';
import { SignForm } from './signupform';
import Child from './Child';



function LoginPage() {
  const [isRegister,setRegister] =  useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedInA,setIsLoggedInA]=useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [loginname,setlogin]=useState("");
  const [roll,setRoll]=useState("");

  const handelUsername = (e) => {
    setUsername(e.target.value);
  }

  const handelPassword = (e) => {
    setPassword(e.target.value);
  }

  //fetching data from  database to the front end.
  const getUsers = async () => {
    try {
      const response = await fetch('http://localhost:8009/login', {
        method: 'GET'
      });
      const result = await response.json();
   
    setUsers(result);
  
     
    } 
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUsers();
  });

  const handleLogin = (e) => {
    const user = users.find((user) => {if(user.username === username && user.password === password)return user;});
    setlogin(user.username);
    setRoll(user.roll);
    
    if (user.roll==='admin') {
      setIsLoggedIn(true);
    }
     else if(user.roll==='user')
    {
      setIsLoggedInA(true);
    } 
    else {
        console.log(password);
        alert("Incorrect username or password");
    }
  };

  const handelRegister=(e)=>
  {
    setRegister(true);
  }

  if(isRegister){
    return <SignForm/>
  }


  if (isLoggedIn) {
    // If the user is logged in, render the authenticated content
    return (<App username={loginname} roll={roll}/>);
  }
  else if(isLoggedInA){
    
    return(<Child username={loginname} roll={roll}/>)
  } 
  else {
    // If the user is not logged in, render the login form
    return (
      <>
       <div className='Signcontainer' id="logsign">
       <div id='inner'>
      <div className='container' id='loginform'>
      <form onSubmit={(e) => 
        {
            e.preventDefault(); 
            handleLogin()
        }}>
        <h1 style={{padding:'15px',textAlign:'center',fontSize:'30px'}}>Login</h1>
        <br></br>
        
          <div className='uname'>
            <label className="label">Username</label>
            <input className="input" type="text"  name="fname"  value={username} onChange={handelUsername}/>
                   
          </div>
          <br/> 
          <div className="pword">
            <label className="label">Password </label>
            <input className="input" type="password"  name="password"  value={password} onChange={handelPassword}/>

          </div>
          <br/>
        <input type='submit' value='submit' className="submit" id='sub'/>
        
      </form>
      <br/>
      <p style={{textAlign:'center'}}>You Don't have Account &nbsp;
      <button id='signupbtn' style={{border:'0px',color:'blue',background:'none'}} onClick={handelRegister}> Sign UP</button></p>
      <br/>
    </div>
  </div>
       </div>
      </>
    );
  }
}
export default LoginPage;