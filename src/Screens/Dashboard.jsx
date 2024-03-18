
const Dashboard = () => {
    const Cards = [
        {
            title : 'Customers',
            total : 20,
            icon : "fa-user"
            
        },
        {
            title : 'Employees',
            total : 14,
            icon : "fa-users"
            
        },
        {
            title : 'Booking',
            total : 8,
            icon : "fa-cart-shopping"
            
        },
        {
            title : 'Main Categories',
            total : 4,
            icon : "fa-layer-group"
            
        }
    ]

    return (
    <section>
        Dashboard
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {Cards.map((item,index)=>(
                    <div key={index} className='hover:bg-gray-200 cursor-pointer flex items-center justify-between shadow-lg p-4 rounded-md '>
                        <div className=" ">
                        <h1 className=" pb-4 text-2xl font-bold text-gray-800">{item.title}</h1>
                        <p className="">total {item.title}:<span className="text-green-800"> {item.total} </span></p>
                            </div>
                            <div className='text-3xl bg-red-100 text-red-600 p-3 rounded-md'>

                        <i className={`fa-solid  ${item.icon}`}></i>
                           </div> 
                    </div>
                ))}
                </div>
            
        </section>
    
  )
}

export default Dashboard