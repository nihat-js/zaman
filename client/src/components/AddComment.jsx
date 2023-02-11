import React, { useState } from 'react'
import { getCookie } from '../utils/getCookie'
import axios from 'axios'

const userPp = "https://www.shareicon.net/data/128x128/2016/11/16/854259_people_512x512.png"
const username = "nihat_"

export default function AddComment(props) {
  const[text,setText] = useState('')
  const {id} = props
  async function add(){
    console.log('ooo')
    let response = await axios.post('http://localhost:5000/add-comment',{token : getCookie('token') , text , post_id :id })
    console.log(response.data)
  }

  return (
    <div className="add-comment flex gap-2">
      <img className='w-5 h-5' src={userPp} alt="" />
      <input className="bg-gray-200 rounded-md outline-none px-2 py-1" type="text" value={text} onChange={(e)=> setText(e.target.value) } placeholder="Write a comment" />
      <button className='bg-teal-600 text-white px-2 py-1'  onClick={ () => add()} > Add </button>
    </div>
  )
}
