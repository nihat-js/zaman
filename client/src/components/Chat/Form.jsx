import InputEmoji from "react-input-emoji";
import EditImage from "../../components/Chat/EditImage"
import pauseSvg from "../../assets/svg/pause.svg"
import playSvg from "../../assets/svg/play.svg"
import { useState } from "react";
import stopSvg from "../../assets/svg/stop.svg"
import gallerySvg from "../../assets/svg/gallery.svg"
import { token } from "../../utils/utils"
import sendSvg from '../../assets/svg/send.svg'
import microphoneSvg from "../../assets/svg/microphone.svg"



export default function Form({ send }) {

  const [text, setText] = useState('')
  const [file, setFile] = useState('')
  const [isAudioRecording, setIsAudioRecording] = useState(false)
  const [audio, setAudio] = useState()

  const recordAudio = () => {
    return new Promise(resolve => {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const mediaRecorder = new MediaRecorder(stream);
          const audioChunks = [];

          mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
          });

          const start = () => {
            mediaRecorder.start();
          };

          const stop = () => {
            return new Promise(resolve => {
              mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                const play = () => {
                  audio.play();
                };

                resolve({ audioBlob, audioUrl, play });
              });

              mediaRecorder.stop();
            });
          };

          resolve({ start, stop });
        });
    });
  };

  async function startRecordingAudio() {
    const recorder = await recordAudio();
    recorder.start();
  }

  async function stopRecordingAudio() {
    let audio_ = await recorder.stop();

  }


  return (

    <form action="" className='flex items-center gap-2 ' >
      {file && <EditImage setFile={setFile} file={file} />}
      {!isAudioRecording && <InputEmoji value={text} onChange={setText} onEnter={send} />}
      {isAudioRecording &&
        <div className="recorder flex-1 flex">
          <p className='w-4 h-4 animate-pulse bg-red-700 rounded-full text-sm text-transparent '> . </p>
          <p> Recording </p>
          <img className='w-4' src={stopSvg} alt="" />
          <button className="py-2 px-3 text-blue-600 hover:text-blue-800 font-semibold  rounded-md" onClick={setIsAudioRecording(false) } >  Cancel </button>
          <button className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md "  >  Send  </button>
        </div>
      }

      {!isAudioRecording && <>
      <img className="w-8 p-1 rounded-full hover:bg-slate-200" src={microphoneSvg} 
      onClick={ () => setIsAudioRecording(true) } />
        <label htmlFor="file">
          <img className='w-10 p-1 rounded-md hover:bg-slate-200' src={gallerySvg} alt="" />
          <input type="file" id="file" hidden onChange={(e) => setFile(e.target.files[0])} />
        </label>
        <img onClick={(e) => { e.preventDefault(); send(text); setText("") }}
          className=' rounded-full w-10 h-10 p-2  img-wrap bg-sky-600  hover:bg-sky-800 cursor-default' src={sendSvg} alt="" />

      </>
      }

    </form>
  )
}
