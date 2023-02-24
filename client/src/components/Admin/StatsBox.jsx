export default function StatsBox(props) {
  const { svg, title, subtitle } = props
  return (
    <div className="flex items-center bg-white px-8 py-5 gap-20 box group rounded-lg shadow-lg hover:bg-indigo-800 ">
      <div className="left ">
        <h2 className="text-2xl font-bold text-indigo-800 group-hover:text-white mb-4 "> {title} </h2>
        <span className='text-xl text-gray-600 group-hover:text-white' > {subtitle} </span>
      </div>
      <div className="right">
        <img style={{ width: "100px" }} className='w-20' src={svg} alt="" />
      </div>
    </div>
  )
}
