import './App.css';
import { Todo } from './components/todo';
import Header from './components/header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllTask from './components/AllTask';
import { ApiContext } from './context/ApiContex';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {

  const uri ='http://127.0.0.1:4000';
  const [tasks,setTasks]=useState([]);

  async function getData(){
      const data = await axios.get(uri);
      setTasks(data.data);
  }
  
  useEffect(()=>{
    getData();
  },[])

  return (
    <div>
    <ApiContext.Provider value={tasks}>
      <BrowserRouter>
      <Header/>
        <Routes>
          
          <Route path='/nav' element={<Header/>}/>
          <Route path='/todo' element={<Todo/>}/>
          <Route path='/tasks' element={<AllTask/>}/>
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
   
  </div> 

    
    
  );
}

export default App;
