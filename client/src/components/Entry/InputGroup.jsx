import { useState } from "react"
export default function InputGroup(props) {
  const { value, setValue , image , text , type } = props

  const [hasFocus,setHasFocus] = useState(false)

  return (
    <div className={` mb-12 relative   `}>
      <div className={`flex gap-2 absolute  duration-200 ${!hasFocus && value != "" ? "top-0" : " -top-4"} `} >
        <img src={image} alt="" className='w-4' />
        <span className='text-gray-400 text-sm'> {text} </span>
      </div>
      <input   type={type}
        className='w-full border-b-2 px-3 py-1 border-b-gray-200 outline-none'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
      />
    </div>
  )

}

