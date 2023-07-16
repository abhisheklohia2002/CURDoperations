import React from 'react'
import "./update.css"
export const UpdateUser = (props) => {
    const {name,email,password,mobile,HandleChange,HandlePost} =props;

  return (
    <div className='sidebar'>
        <div className='titleUpdate'>
            Please Fill Update Value
        </div>
    <div >
    <form className='form_update' onSubmit={HandlePost}>
    <input style={{width:"auto"}} onChange={HandleChange} value= {name} type="text" name="name" placeholder='Enter Your Name' /><br />
    <input style={{width:"auto"}} onChange={HandleChange} value = {email} type="email" name="email" placeholder='Enter Your Email' /><br />
    <input style={{width:"auto"}} onChange={HandleChange} value = {password} type="password" name="password" placeholder='Enter Your Password' /><br />
    <input style={{width:"auto"}} onChange={HandleChange} value  = {mobile} type="text" name="mobile" placeholder='Enter Your Mobile' /><br />

    <input  onClick={HandlePost} className='submit' style={{cursor:"pointer",width:"auto"}} type="submit" name="Update"  /><br />


</form>
    </div>




    </div>
  )
}
