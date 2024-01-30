import 'axios'
import axios from 'axios'
import { useEffect, useState } from 'react'
import '../src/todo.css'
export function Todo(){


    const uri ='http://127.0.0.1:4000';

    const [taskText,setTaskText]=useState('')
    const [taskError,setTaskError] = useState('');
    const [tasks,setTasks]=useState([]);
    const [temp,setTemp]=useState(false);

    async function getData(){
        await axios.get(uri)
        .then(res=>{
           setTasks(res.data);
        })
    }
    
    
    // async function addData(){
    //     setTaskError('');       
    //     if(taskText !== ''){
    //         // alert('hii')
    //         await axios.post(`${uri}/addtask`,{"task":taskText},{
    //             headers:{
    //                 'Content-type':'application/json'
    //             }
    //         });

    //         await getData()
    //     } else {
    //         setTaskError('Enter Your Task First')
    //     }
    // }

    async function addData() {
        
        setTaskError('');
        if (taskText.trim() !== '') {
            try {
                await axios.post(`${uri}/addtask`, { "task": taskText.trim() }, {
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                await setTemp(!temp);
              } catch (error) {
                console.error('Error adding task:', error);
                setTaskError('Error adding task. Please try again.'); // Set an error message on failure
            }finally{
                console.log('hii')
            }
        } else {
            setTaskError('Enter Your Task First');
        }

    }

    async function removeTask(e){
        setTemp(!temp);
        const taskid = e.target.id;
        await axios.delete(`${uri}/removetask/${taskid}`,{
            headers:{
                'Content-Type': 'application/json',
            }
        })
    }

    useEffect(()=>{
        console.log("side effect" )
        getData();
    },[temp])

   
    return (
        <div className="parent">
            <div className='input-div'>
                <div className='task-input-parent'>
                <input type="text" onChange={(e)=>setTaskText(e.target.value)} value={taskText} placeholder='Enter Task' className='task-input'/>
                {taskError ?( <p className="" style={{color:"red"}}>{taskError}</p>):''}
                </div>
                <button className="add-btn btn" onClick={addData} >Add</button>
            </div>

            <div className="tasks-div">
            {
                tasks.map(t=>{
                    return <div className="task-div" key={t.id}>
                        <p>{t.task}</p>
                        <button className="remove-btn btn" onClick={removeTask} id={t.id} >remove</button>
                    </div>
                })
            }
            </div>
        </div>
    )
}
