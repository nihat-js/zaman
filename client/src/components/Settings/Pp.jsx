export default function SetProfilePicture() {

  const [sampleImages, setSampleImages] = useState([
    "https://images.freeimages.com/images/large-previews/023/geek-avatar-1632962.jpg",
    "https://images.freeimages.com/images/large-previews/962/avatar-man-with-mustages-1632966.jpg",
    "https://images.freeimages.com/images/large-previews/d66/woman-avatar-1632963.jpg"
  ])
  async function handleClick(e) {
    e.preventDefault()
    const formData = new FormData();
    formData.append('name', "Nihat")
    formData.append('image', '')
    formData.append('file', inputFile.current.files[0])
    axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })



    return (
      <div>
        <div className="samples">
          <div className="row flex gap-3">
            {sampleImages.map((item, index) => <img src={item} key={index} className="w-14 rounded-full cursor-pointer " onClick={() => changeProfilePicture(item)} />)}
          </div>
          <form onSubmit={handleClick} encType="multipart/form-data" >
            <input ref={inputFile} type="file" name="file" />
            <button > Upload </button>
          </form>
        </div>
      </div>
    )
  }
}