import React, { useState } from 'react'
import "./createuser.css"
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar';
export const CreateUser = () => {
const nav = useNavigate();

const [info,setinfo] = useState({
    name:"",
    email:"",
    password:"",
    mobile:""
})
var name,value;

const HandleChange = (e)=>{
    e.preventDefault();

value = e.target.value;
name = e.target.name;
setinfo({...info,[name]:value});
console.log(info)
}


const HandlePost = async(e)=>{
    e.preventDefault();

   const {name,email,password,mobile} = info;


   try {
    if(name!== "" || email !== "" || password !== "" ||mobile !== ""){

        const res=  await fetch(`https://cur-doperations.vercel.app/api/alluser`,{
    method:"POST",
    headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
        });
        const out = await res.json();
        console.log(out)
        if(out.message === "please try Again"){
            alert("User Already Register by this Email")
        }
        else {
            alert(" Register Successfully"+" "+out.token);
            nav("/")
        }
    }
    else{
        alert("Please Fill All Entry")
       
    }

   } catch (error) {
    console.log(error)
   }
}



  return (
    <>
    <Navbar/>
    <div className='div_form'>
<div className='title'>
Regsiter User
</div>
<form className='form_body' onSubmit={HandlePost}>
    <input onChange={HandleChange} value= {info.name} type="text" name="name" placeholder='Enter Your Name' /><br />
    <input onChange={HandleChange} value = {info.email} type="email" name="email" placeholder='Enter Your Email' /><br />
    <input onChange={HandleChange} value = {info.password} type="password" name="password" placeholder='Enter Your Password' /><br />
    <input onChange={HandleChange} value  = {info.mobile} type="text" name="mobile" placeholder='Enter Your Mobile' /><br />

    <input onClick={HandlePost} className='submit' style={{cursor:"pointer"}} type="submit" name=""  /><br />


</form>

    </div>
    </>
  )
}
