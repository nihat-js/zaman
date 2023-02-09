import { useState } from "react";
import axios from 'axios'
import {getCookie} from '../utils/getCookie'
export default function Index() {

  async function post(e){
    e.preventDefault()
    let response = await axios.post('http://localhost:5000/post', {text : text , token : getCookie('token')} )
    console.log(response.data)
  }

  const [text,setText] = useState('');


  return (
    <div className="feed-page">

      <section className="start">

        <form   onSubmit={(e)=> post(e) }>
          <input value={text} onChange={(e)=> setText(e.target.value)  }   type="text" placeholder="What are your thoughts" />
          <button> Share  </button>
        </form>


      </section>

    </div>
  )
}
