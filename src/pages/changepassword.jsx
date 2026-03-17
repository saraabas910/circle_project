import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../components/contexts/authContext';
import { useState } from 'react';
import axios from 'axios';
import { Button } from '@heroui/react';


export default function ChangePassword() {
const {UserToken} = useContext(AuthContext)
const [password,setPassword] = useState("")
const [newPassword,setNewPassword] = useState("")
const [confirmPassword,setConfirmPassword] = useState("")

      console.log("tt",UserToken)
async function changepass(password, newPassword) {
  try {
    const res = await axios.patch( 
      "https://route-posts.routemisr.com/users/change-password",  
      {
        password: password,
        newPassword: newPassword
      },
      {
        headers: {
          Authorization: `Bearer ${UserToken}`  
        },
      }
    );
    console.log(res.data);
  } catch (error) {
    console.log(error.response?.data);
  }
}
function handleSubmit(e){
  e.preventDefault()

  if(newPassword !== confirmPassword){
    alert("Passwords do not match")
    return
  }

  changepass(password,newPassword)
}



  return (
    <form onSubmit={handleSubmit}>
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      
      <div className="bg-white p-8 rounded-2xl shadow-md w-125">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-2 rounded-full">
            🔑
          </div>
          <div>
            <h2 className="text-xl font-bold">Change Password</h2>
            <p className="text-gray-500 text-sm">
              Keep your account secure by using a strong password.
            </p>
          </div>
        </div>

        {/* Current Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Current password
          </label>
          <input
          value={password}
            type="password"
            placeholder="Enter current password"
             onChange={(e)=>setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* New Password */}
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">
            New password
          </label>
          <input
            type="password"
            value={newPassword}
             onChange={(e)=>setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <p className="text-xs text-gray-500 mb-4">
          At least 8 characters with uppercase, lowercase, number, and special character.
        </p>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Confirm new password
          </label>
          <input
            type="password"
              onChange={(e)=>setConfirmPassword(e.target.value)}
            placeholder="Re-enter new password"
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Button */}
         <Button type="submit" color="primary" variant="solid" className='w-2xs'>confirm</Button>

      </div>

    </div>
    </form>
  );
}