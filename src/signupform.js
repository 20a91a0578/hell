import React,{useState,useEffect } from 'react';
import './signup.css';
import LoginPage from './LoginPage';
const SignForm=()=>{
    const [formIsSubmitted, setFormIsSubmitted]=useState(false);
    const submitForm=()=>{
        setFormIsSubmitted(true);
    };
    return (<div>{!formIsSubmitted ? (<Signupform submitForm={submitForm}/>):(<LoginPage/>)}</div>)
   }


const Signupform = ({submitForm}) =>{

    //Field values..;
   
    const[values,setValues]= useState({
        fname:"",
        lname:"",
        email:"",
        password:"",
    });

//form validationss...
const validation=(values)=>{
    let errors={};

    if(!values.fname){
        errors.fname="Name is required."
    }
    if(!values.lname){
        errors.lname="Name is required."
    }
    if(!values.email){
        errors.email="Email is required."
    } else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email="Email.is invalid."
    }
    if(!values.password)
    {
        errors.password="Password is required."
    }
    else if(values.password.length<5){
        errors.password="Password must be more than five characters.";
    }
    
    return errors;
}

const signup=async(values)=>{
   try{
const response=await fetch("http://localhost:8009/signup",{
 method:"POST",
 body:JSON.stringify(values),
 headers:{
    "Content-Type":"application/json"
   
 }  
});
console.log(response);
   }catch(err){
    console.log('err');
   }
}


    const [errors,setErrors]=useState({});
    const [dataIsCorrect,setDataIsCorrect]=useState(false);
    const handleChange = (event)=>{
        setValues({
            ...values,
            [event.target.name]: event.target.value,
                 });
                                  }
    const handleFormSubmit =(event)=>{
        
        event.preventDefault();
         setErrors(validation(values));
        setDataIsCorrect(true);
       
        signup(values);
    
    };
    
    useEffect( ()=>{
        if(Object.keys(errors).length===0&&dataIsCorrect){
            submitForm(true);
           
        }
    },[errors]);
    return (
    <div className='Signcontainer'>
        <div className='app-wrapper'>
            <div>
                <h2 className='title'>Create Account</h2>
            </div>
            <form className='form-wrapper'>
                <div className='fname'>
                    <label className="label">First Name</label>
                    <input className="input" type="text" name="fname" value={values.fname} onChange={handleChange}/>
                    {errors.fname && <p className='error'>{errors.fname}</p>}
                </div>
                <div className="lname">
                    <label className="label">Last Name</label>
                    <input className="input" type='text' name="lname"  value={values.lname} onChange={handleChange}/>
                    {errors.lname && <p className='error'>{errors.lname}</p>}
                </div>
                <div className="email">
                    <label className="label">Email</label>
                    <input className="input" type="email"  name="email"  value={values.email} onChange={handleChange}/>
                    {errors.email && <p className='error'>{errors.email}</p>}
                </div>
                <div className="password">
                    <label className="label">Password</label>
                    <input className="input" type="password" name="password"  value={values.password} onChange={handleChange}/>
                    {errors.password && <p className='error'>{errors.password}</p>}
                </div>
                <div>
                    <button className="submit" onClick={handleFormSubmit}>Sign Up</button>
                </div>
            </form>
            
        </div>
    </div>
    );
};



export default Signupform;
export {SignForm};