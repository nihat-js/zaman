import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { host } from '../../config/config';
import { token } from '../../utils/utils';
import loadingSvg from "../../assets/svg/loading.svg"


export default function main() {

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [cnewPassword, setCnewPassword] = useState("")
  const [error, setError] = useState("")
  const [info, setInfo] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate('')

  async function handleSubmit() {
    if (!oldPassword || !newPassword || !cnewPassword) {
      return setError("Please fill all the fields")
    }
    if (newPassword.length < 6) {
      return setError("New password should be at least 6 characters")
    }
    if (newPassword != cnewPassword) {
      return setError("Confirm password doesn't match")
    }
    setIsLoading(true)
    setError('')
    try {
      let response = await axios.post(host + "api/user/account/change-password", { token, old_password: oldPassword, new_password :newPassword, })
      // navigate('/account')
      setError('')
      if (response.status == 200) {
        setInfo('Password changed successfully')
      }
      setIsLoading(false)
      setOldPassword('')
      setNewPassword('')
      setCnewPassword('')
    } catch (err) {
      console.log(err)
      if (err.response.status == 489) {
        // console.log('st',err.response.status)        
        setError('Old password is not correct')
      }else if (err.response.status == 456){
        setError("You cannot use old password ")
      }
      setIsLoading(false)
      console.log(err)
    }

  }



  return (
    <div>
      <p className=' px-2 py-2 text-2xl mb-2 font-bold' >Change password</p>
      <p className="text"> Password should be at least 6 characters </p>
      <form action="" className='flex flex-col gap-4 w-6/12'>
        <input className='px-4 py-2 border-slate-200 outline-none rounded-md ' placeholder='Old password '
          type="password" name="oldPassword" onChange={(e) => setOldPassword(e.target.value)} />
        <input className='px-4 py-2 border-slate-200 outline-none rounded-md ' type="password" name="newPassword" placeholder='New Password'
          onChange={(e) => setNewPassword(e.target.value)} />
        <input className='px-4 py-2 border-slate-200 outline-none rounded-md ' type="password" name="cNewPassword" placeholder='Confirm new password'
          onChange={(e) => setCnewPassword(e.target.value)} />

      </form>
      <p className='text-base text-red-600 mt-2 font-bold'>
        {error}
      </p>
      <p className='text-green-600 mt-2 font-bold'  > {info} </p>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 flex gap-2 items-center"
        onClick={(e) => { e.preventDefault(); isLoading ? "" : handleSubmit() }} >
        {isLoading && <img src={loadingSvg} className='w-4 animate-spin ' />}
        Change password
      </button>
    </div>
  )


}