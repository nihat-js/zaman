export default function StatsSkleton() {
  return (
    <div className="flex items-center bg-white px-8 py-5 gap-20 box group rounded-lg shadow-lg ">
      <div className="left">
        <h2 className="text-3xl font-semibold text-transparent bg-slate-200 mb-4 animate-pulse  rounded-lg"> Iamloading </h2>
        <span className='text-xl text-transparent bg-slate-200 animate-pulse rounded-lg' > IamloadingIamloading </span>
      </div>
      <div className="right">
        <div style={{ width: "100px" , height : "100px" }} className="bg-slate-200 animate-pulse rounded-full" >
          <img style={{ width: "100px" }} className='w-20' src alt="" />
        </div>
      </div>
    </div>
  )
}
