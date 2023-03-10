import { host } from "../../config/config"
import axios from "axios"
import { token } from "../../utils/utils"
export default function ReportModal(props) {
  const {post_id ,val , closeModal} = props

  async function report(val){
    try{
      let response = await axios.post(host + 'api/post/report', { token , post_id ,argument : val } )
      console.log(response.data)
      closeModal()
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="report absolute top-0 left-0 w-screen h-screen flex justify-center items-center z-20  " style={{ backgroundColor: "rgba(0,0,0,0.6) " }}>
      <div className="content bg-white shadow-lg pb-5 px-5 rounded ">
        <p className="bg-teal-800 px-5 py-3 text-white text-xl"> Select reason </p>
        <div className="flex flex-col mt-8">
          <button className="bg-gray-100 text-xl hover:bg-teal-600 rounded-md py-2 "  onClick={() => report(0) }  > Spam </button>
          <button className="bg-gray-100 text-xl hover:bg-teal-600 rounded-md py-2 " onClick={() => report(1) }  > Hate Speech  </button>
          <button className="bg-gray-100 text-xl hover:bg-teal-600 rounded-md py-2 " onClick={() => report(2) }  > Scam </button>
          <button className="bg-gray-100 text-xl hover:bg-teal-600 rounded-md py-2 "onClick={() => report(3) }  > Other </button>
        </div>

      </div>
    </div>
  )
}
