import React , {useState} from 'react'
import { host } from '../../config/config'
import arrowLeftSvg from "../../assets/svg/arrow-left.svg"
import arrowRightSvg from "../../assets/svg/arrow-right.svg"

export default function Gallery({sources}) {

  const [sourceIndex, setSourceIndex] = useState(0)


  return (
    <div>

      <div className="gallery relative mb-4">
        {5 > 3 ? <img className='rounded-md'  style={{ width: "100%" }} onDoubleClick={() => reactToPost('up')} src={host + "images/" + sources[sourceIndex]} /> : ""}
        {sources.length > 1 &&
          <img onClick={() => sourceIndex + 1 == sources.length ? setSourceIndex(0) : setSourceIndex(sourceIndex + 1)}
            className="w-8 absolute top-1/2 right-4 bg-slate-50 rounded-full p-2 cursor-pointer hover:bg-slate-200  opacity-50 hover:opacity-90 " src={arrowRightSvg} />
        }
        {sources.length > 1 &&
          <img onClick={() => sourceIndex == 0 ? setSourceIndex(sources.length - 1) : setSourceIndex(sourceIndex - 1)}
            className="transition-all duration-300 w-8 absolute top-1/2 left-4  bg-slate-50 rounded-full p-2 cursor-pointer hover:bg-slate-200 opacity-50 hover:opacity-90  " src={arrowLeftSvg} />
        }
      </div>
      {
        typeof sources == 'object' && sources.length > 1 &&
        <div className="flex justify-center gap-2">
          {
            sources.map((i, j) => {
              return (
                <p key={j} className={`w-2 h-2 bg-indigo-400  rounded-full  cursor-pointer hover:bg-indigo-600 ${j == sourceIndex ? 'bg-indigo-800  ' : ""} `}
                  onClick={() => setSourceIndex(j)} > </p>
              )
            })
          }
        </div>
      }

    </div>

  )
}
