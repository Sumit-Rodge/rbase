import React, { useContext } from "react"
import { ApiContext } from "../context/ApiContex"

export default function AllTask(){

    const tasks= useContext(ApiContext)
    
    return(

        <div className="bg-gray-900 h-screen flex flex-col items-center pt-10">
            <h1 className="text-gray-100 font-bold capitalize pb-5 ">view all task</h1>
            <div className="flex flex-col text-gray-50   ">
                {
                    tasks.map(item=>{
                        return <div className="flex flex-row justify-between text-xl capitalize">
                            {item.task}
                        </div>
                    })
                }
            </div>
        </div>
    )
}