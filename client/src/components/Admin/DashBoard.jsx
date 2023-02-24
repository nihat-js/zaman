import usersSvg from "../../assets/svg/users.svg"

export default function DashBoard() {

  function greeting() {
    let today = new Date()
    let curHr = today.getHours()
    if (curHr < 12) {
      return 'good morning'
    } else if (curHr < 18) {
      return 'Good afternoon'
    } else {
      return 'Good evening'
    }
  }

  return (
    <div>
      <header>
        <h4>  {greeting()} Nihat </h4>
        <div className='bg-slate-100 w-8 h-8 '></div>
      </header>


      <div className="boxes flex gap-8">
        <Box svg={usersSvg} title="50 users" subtitle="All time" />
        <Box svg={usersSvg} title="50 posts" subtitle="All posts" />
      </div>

    </div>
  )
}
function Box(props) {
  return (
    <div className="flex items-center bg-white px-8 gap-20 box group rounded-md shadow-md hover:bg-purple-800 ">
      <div className="left">
        <h2 className="text-2xl text-indigo-600 group-hover:text-white "> 50 Users </h2>
        <span className='text-xl text-gray-600 group-hover:text-white' > Total users </span>
      </div>
      <div className="right">
        <img style={{ width: "100px" }} className='w-20' src={usersSvg} alt="" />
      </div>
    </div>
  )
}