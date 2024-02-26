import { Link, Navigate, useNavigate } from "react-router-dom";

import AllTask from "./AllTask"

export default function Header(){

    const navigate = useNavigate();


    return(
        <header className="bg-slate-900 text-white p-2 flex items-center justify-center underline *:m-1 *:text-red-800 *:text-2xl">
           <Link to='/todo' className="hover:text-white" >Home</Link>
           <Link to='/tasks' className="hover:text-white">All Tasks</Link> 

            
        </header>
    )
} 