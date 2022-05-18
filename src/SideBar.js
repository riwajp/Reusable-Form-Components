
const SideBar=({render})=>{

    return(<div>
        <div className=" overflow-auto h-screen px-2">
              {render()}

            </div>
            </div>)
}

export default SideBar;