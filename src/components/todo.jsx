import 'axios'
import axios from 'axios'
import { useEffect, useState } from 'react'


export function Todo(){

    
    const uri ='http://127.0.0.1:4000';
    const [taskText,setTaskText]=useState('')
    const [taskError,setTaskError] = useState('');
    const [tasks,setTasks]=useState([]);

    async function getData(){
        const data = await axios.get(uri);
        setTasks(data.data);
    }

    async function addData() {
        
        setTaskError('');
        if (taskText.trim() !== '') {
            try {
                await axios.post(`${uri}/addtask`, { "task": taskText.trim() }, {
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                getData();
              } catch (error) {
                console.error('Error adding task:', error);
                setTaskError('Error adding task. Please try again.'); // Set an error message on failure
            }
        } else {
            setTaskError('Enter Your Task First');
        }

    }

    async function removeTask(e){

        const taskid = e.target.id;
        await axios.delete(`${uri}/removetask/${taskid}`,{
            headers:{
                'Content-Type': 'application/json',
            }
        })
        getData();
        
    }

    async function handleCheckbox(e){
        const taskid=e.target.id;
        
        await axios.put(`${uri}/update/${taskid}`,{
            headers:{
                'Content-Type': 'application/json',
            }
        });
        getData();
    }

    useEffect(()=>{
        getData();
    },[])

   
    return (
        <div className=" min-h-screen bg-slate-900 text-white  flex flex-col pt-20 items-center " >
            <div className='flex flex-row items-end mb-4'>
                <div className=''>
                <label htmlFor="task-field" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Task</label>

                <input id="task-field" type="text" onChange={(e)=>setTaskText(e.target.value)} value={taskText} placeholder='task' 
                className='bg-gray-500 text-white text-md placeholder-white p-2 rounded-lg '/>
                {taskError ?( <p className="" style={{color:"red"}}>{taskError}</p>):''}
                </div>

                <button className="p-2 bg-green-700 px-4 rounded-2xl ml-2 text-lg hover:bg-white hover:text-black" onClick={addData} >Add</button>
            </div>

            <div className="">
            {
                tasks.map(t=>{
                    return <div className="flex flex-row  bg-gray-800 text-gray-100 mt-6 w-96 justify-between p-2 rounded-xl" 
                    key={t.id}>
                        <input type="checkbox" checked={t.status} onChange={handleCheckbox} id={t.id}/>
                        <p className="text-2xl" style={{color:t.status?'green':'red'}}>{t.task}</p>
                        <button className="texm-md underline hover:text-red-500" onClick={removeTask} id={t.id} >remove</button>
                    </div>
                })
            }
            </div>
        </div>
    )
}
