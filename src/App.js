import { useEffect, useRef, useState } from 'react';
import './App.css';
import {RiDeleteBin6Line} from 'react-icons/ri'

function App() {
  const task = useRef(null);
  const [tasks,setTasks]=useState(localStorage.getItem('tasks')!==null?JSON.parse(localStorage.getItem('tasks')):[]);
  const [isActive,setIsActive]=useState('1')
  useEffect(()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks))
  },[tasks])
  const addTask = ()=>{
    setTasks([...tasks,{task:task.current.value,complieted:false,id:new Date().getTime()}])
    task.current.value=''
  }
  const handleChecked = (id,e)=>{
    const newTasks = tasks.map(tsk=>{
      if(tsk.id===id)
      return {...tsk,complieted:!tsk.complieted}
    return tsk
    })
    setTasks(newTasks)
  }
  const handleDelete = (id)=>{
    setTasks(tasks.filter((tsk)=>tsk.id!==id))
  }
  const handleDeleteALL = ()=>{
    setTasks(tasks.filter((tsk)=>!tsk.complieted))
  }
  return (
    <>
    <header style={{textAlign:"center"}}>
      <h1>#todo</h1>
    </header>
    <div className="choies">
      <button className={`btn ${isActive==='1'?'active':''}`} onClick={()=>setIsActive('1')}>All</button>
      <button className={`btn ${isActive==='2'?'active':''}`} onClick={()=>setIsActive('2')}>Active</button>
      <button className={`btn ${isActive==='3'?'active':''}`} onClick={()=>setIsActive('3')}>Completed</button>
    </div>
    <div className="addContainer">
      <input type="text" className="form-control" name="add" id="add_input" placeholder='add details' ref={task} />
      <button className='btn  btn-primary' onClick={addTask}> Add </button>
    </div>
    <div className="tasks">
      {tasks.map((task , index)=>{
        if(isActive==='1')
        return(
          <div className='task' key={index}>
            <input type="checkbox" className={`form-check-input`} onChange={(e)=>handleChecked(task.id,e)} checked={task.complieted}  />
            <span className={task.complieted?'completed':''}>
              {task.task}
              
            </span>
          </div>
        )
        else if(isActive==='2'){
          if(!task.complieted)
          return (
            <div className='task' key={index}>
            <input type="checkbox" className={`form-check-input`} onChange={(e)=>handleChecked(task.id,e)} checked={task.complieted}  />
            <span className={task.complieted?'completed':''}>
              {task.task}
            </span>
          </div>
          )
        }
        else{
          if(task.complieted)
          return (
            <div className='task' key={index}>
            <input type="checkbox" className={`form-check-input`} onChange={(e)=>handleChecked(task.id,e)} checked={task.complieted}  />
            <span className={task.complieted?'completed':''}>
              <span>{task.task}</span>
              <button className="btn" onClick={()=>handleDelete(task.id)}><RiDeleteBin6Line/></button> 
            </span>
          </div>
          )
        }
      })}
      <div className='d-flex justify-content-center'>
      {isActive==='3'?<button className='btn  btn-danger' onClick={handleDeleteALL} ><RiDeleteBin6Line/> delete all</button>:''}
      </div>
    </div>
    </>
  );
}


export default App;
