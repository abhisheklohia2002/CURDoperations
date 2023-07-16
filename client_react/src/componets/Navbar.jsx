import React from 'react'
import "./nav.css"
import {AiOutlineUserAdd} from "react-icons/ai"
import { Link } from 'react-router-dom'
import {BiSolidUserCircle} from "react-icons/bi"
export default function Navbar() {
  return (
  <>
  <div className='nav'>
    <div style={{textTransform:"uppercase"}}>
<Link style={{textDecoration:"none"}} to = "/register" >
Register <AiOutlineUserAdd/>
</Link>
    </div>
    <div style={{textTransform:"uppercase"}}>
<Link to = "/" style={{textDecoration:"none",color:"red"}}>
Show User <BiSolidUserCircle/>
</Link>

    </div>
  </div>
  
  
  </>
  )
}
