import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import './GetUser.css'

import {AiFillDelete,AiTwotoneMail} from "react-icons/ai"
import {GrDocumentUpdate} from "react-icons/gr"
import { UpdateUser } from './UpdateUser'

export const GetUser = () => {
const [count,setcount]  = useState(0)
const [isdone,setdone] = useState(true)
const [issort,setsort] = useState(true)
const [page,setpage] = useState(1)

const [show,setshow] = useState([])
const [sortShow,setsortshow] = useState([])

const [updateid,setupdateId]  = useState("")
const [info,setinfo] = useState({
    name:"",
    email:"",
    password:"",
    mobile:""
})

    //Read Request
    const GetUserData = async()=>{
        try {
            const res=  await fetch("https://cur-doperations.vercel.app/api/alluser");
            const out = await res.json();
            console.log(out)
            setshow([...out])
            console.log(show)
        } catch (error) {
            console.log(error)
        }
    }

    //Delete Request

const HandleDelete = async(id)=>{
    try {
            const res=  await fetch(`https://cur-doperations.vercel.app/api/alluser/${id}`,{
                method:"DELETE",
            });
            const out = await res.json();
            console.log(out)
            setcount((count)=>count+1)
        
    } catch (error) {
        console.log(error)
    }
}


    //Update Request

const HandlePut = (id)=>{
    setupdateId(id);
    console.log(updateid)
   setdone(!isdone);
}

const HandlePost = async(e)=>{
e.preventDefault();

    try {
        if(info.name !== "" || info.email !== "" || info.mobile !== "" ||  info.password !== ""){

            const res = await fetch(`https://cur-doperations.vercel.app/api/alluser/${updateid}`,{
                method:"PUT",
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(info),
                    })
    
    const out = await res.json();
    console.log(out)
    if(out.msg === "Not Update"){
    alert("Something Went Worng in Update")
    }
    else {
        alert("Update Successfully");
        setcount((count)=>count+1)
        setupdateId("");
        
    }
        }

        else{
            alert("Please Fill All Entry")
        }

    } catch (error) {
        console.log(error)
    }

}
var name,value;
const HandleChange = (e)=>{
    e.preventDefault()
name = e.target.name;
value = e.target.value

setinfo({...info,[name]:value});
console.log(info)
}




//sort By Name

const HandleSort = ()=>{
  for(var i = 0;i<show.length; i++){
    for(var j = 0; j<show.length-i-1; j++){
        if(show[j].name > show[j+1].name)
{
    var temp = show[j];
    show[j] = show[j+1];
    show[j+1] = temp 
}    }
  }

  console.log(show,"sort")
  setsortshow([...show])
  setsort(!issort)
  setcount((count)=>count+1)
}



const FetchData =  async()=>{
   console.log(page)
try {
    const GetData = await fetch(`http://localhost:8000/api/allusersort?page=${page}`);
const save= await GetData.json();
console.log(save,"save")
setsortshow([...save]);
setshow([...save])
} catch (error) {
    
}
}






    useEffect(()=>{
GetUserData()
    },[count])
  return (
    <>
    <Navbar/>
<div className="sortname">
    <div>
       <button onClick={HandleSort}> Sort By Name</button>
    </div>
</div>
<div style = {{display:"flex",justifyContent:'center',alignContent:"center"}}>
    <button style = {{width:"3rem",height:"2rem",cursor:"pointer"}} onClick={()=>{
   page > 0?setpage((page)=>page-1):page
    FetchData()
    }} >Prev</button> 
  <span style={{color:"teal",fontSize:"1.5rem",margin:"0px 2px 0px 2px "}}>
    {page}
  </span>
    <button style = {{width:"3rem",height:"2rem",cursor:"pointer"}} onClick={()=>{
        setpage((page)=>page+1);
        FetchData()
    }}>Next</button>

</div>
    <div className='getDisplay'>
        <table style={{width:"100%"}}>

<tr className='tr_title'>
    <th style={{color:""}}>
      NAME
    </th>
    <th>
    EMAIL 
    </th>
    <th>
      MOBILE
    </th>
    <th>
        Delete
    </th>
    <th>
        Update
    </th>
</tr>


           {
  issort ?(show?.map((e,i)=>(
                <tr className='tr_body' key = {e._id}>
                <th>
{e.name}
                </th>
                <th>
{e.email}
</th>
<th>
{e.mobile}
</th>
<th style={{cursor:"pointer",color:"red"}} onClick = {()=>HandleDelete(e._id)}>
    <AiFillDelete/>
</th>
<th onClick={()=>HandlePut(e._id)} style={{cursor:"pointer",color:"blue"}}>
    <GrDocumentUpdate/>
</th>
                
            </tr>

            ))):
            (
            sortShow?.map((e,i)=>(
                <tr className='tr_body' key = {e._id}>
                <th>
{e.name}
                </th>
                <th>
{e.email}
</th>
<th>
{e.mobile}
</th>
<th style={{cursor:"pointer",color:"red"}} onClick = {()=>HandleDelete(e._id)}>
    <AiFillDelete/>
</th>
<th onClick={()=>HandlePut(e._id)} style={{cursor:"pointer",color:"blue"}}>
    <GrDocumentUpdate/>
</th>
                
            </tr>

            )) 
            )
           }
        </table>
    
    </div>
<div>
    {
        isdone?<h1></h1>:(<UpdateUser name = {info.name} email = {info.email} password = {info.password} mobile = {info.mobile} HandleChange = {HandleChange} HandlePost = {HandlePost} />)
    }
</div>
   

    </>
  )
}
