import {Avatar} from "./BlogCard"
import { Link, useNavigate } from "react-router-dom"

export const Appbar = () => {
    const navigate = useNavigate() ;
    function clickLogOut() {
        localStorage.removeItem("token") ;
        navigate("/signin") ;
    }
    return <div className="border-b flex justify-between px-10 py-2">
        <Link to={'/blogs'} className="flex items-center justify-center cursor-pointer text-xl font-bold">
                TechnoSphere&nbsp; <span className=" text-slate-400"> by AVTG</span>
        </Link>
        <div className="flex flex-row">
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
            </Link>
            <div>
                <button onClick={clickLogOut} type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">Log Out</button>
            </div>

            <Avatar size={"big"} name="AVTG" />
        </div>
    </div>
}