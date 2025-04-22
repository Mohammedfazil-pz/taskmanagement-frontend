import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addTask, deleteTask, getOneTask, getTask } from '../services/allAPI';

const Task = () => {
    const [show, setShow] = useState(false);
    const [editshow, setEditshow] = useState(false);


    const [data,setData]=useState([])
  const [serverResponce,setServerResponce]=useState("")

  const [input,setInput]=useState({
    title:"",
    description:"",
    startdate:"",
    enddate:"",
    status:"",
    progress:"",
  })

  const [box,setbox]=useState({
    title:"",
    description:"",
    startdate:"",
    enddate:"",
    status:"",
    progress:"",
  })

  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  


  const handleCloseEdit = () => setShow(false);

 


  

  useEffect(()=>{
    onGetTask()
  },[serverResponce])

  const onAdd=async()=>{
    if(input.title&&input.description&&input.startdate&&input.enddate&&input.status&&input.progress){
        try {
            const serverResp=await addTask(input)
            if(serverResp.status==200){
                alert("Task added")
                setServerResponce(serverResp)
                handleClose()
            }else{
                alert("Error occured")
            }
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }else{
        alert("Please fill all the details")
    }
  }

  const onGetTask=async()=>{
    try {
        const serverResponce=await getTask()
        setData(serverResponce.data)

    } catch (error) {
        console.log(error)
    }
  }

  const onDelete=async(id)=>{
    try {
        const serverResponce=await deleteTask(id)
        setServerResponce(serverResponce)
    } catch (error) {
        alert(error)
        console.log(error)
    }
  }

  const handleShowEdit=(id)=>{
    let filtereddata=data.find((a)=>a['_id']==id)
    setIsEditBtn(filtereddata)
    setEditshow(true)

  }






  return (
    <>
    <div className='d-flex container justify-content-center'>
     <div className="row w-75 border rounded mt-4">
     <h1 className='text-center'>Task Application</h1>
     <div className=''>
        <button className='btn btn-success float-end w-25' onClick={handleShow}>Add</button>
     </div>
     <div>
     <table class="table text-center mt-4">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">Start Date</th>
      <th scope="col">end Date</th>
      <th scope="col">status</th>
      <th scope="col">Progress percentage</th>
      <th scope="col">...</th>
      
    </tr>
  </thead>
  <tbody>
    {data?.map((a)=>(
        <tr>
        <th scope="row">1</th>
        <td>{a.title}</td>
        <td>{a.description}</td>
        <td>{a.startdate}</td>
        <td>{a.enddate}</td>
        <td>{a.status}</td>
        <td>{a.progress}</td>
        <div>
          <button className='btn btn-success' onClick={()=>handleShowEdit(a._id)}>Update</button>
          <button className='btn btn-danger ms-3' onClick={()=>onDelete(a._id)}>Delete</button>
        </div>
      </tr>
    ))}
    </tbody>
    </table>
     </div>
     </div>
    </div>
  
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
            <input type="text" placeholder='Title' className='form-control' onChange={(e)=>setInput({...input,title:e.target.value})} />
            <textarea type="text" placeholder='Description' className='form-control mt-2 mb-2' onChange={(e)=>setInput({...input,description:e.target.value})}  />
            <p className=''>Start date</p>
            <input onChange={(e)=>setInput({...input,startdate:e.target.value})}  type="date" placeholder='start' className='form-control' />
            <p className=''>End date</p>
            <input onChange={(e)=>setInput({...input,enddate:e.target.value})}  type="date" placeholder='end' className='form-control' />
            <input onChange={(e)=>setInput({...input,status:e.target.value})}  type="text" placeholder='Status ' className='form-control mt-2 mb-2' />
            <input onChange={(e)=>setInput({...input,progress:e.target.value})}  type="text" placeholder='Progeressrate' className='form-control' />


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={onAdd} >
           Add
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={editshow} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
            <input type="text" placeholder='Title' className='form-control' value={iseditBtn.title} onChange={(e)=>setbox({...iseditBtn,box:e.target.value})} />
            <textarea type="text" placeholder='Description' className='form-control mt-2 mb-2' value={iseditBtn.description}  onChange={(e)=>setbox({...box,description:e.target.value})}  />
            <p className=''>Start date</p>
            <input onChange={(e)=>setbox({...box,startdate:e.target.value})} value={iseditBtn.startdate}  type="date" placeholder='start' className='form-control' />
            <p className=''>End date</p>
            <input onChange={(e)=>setbox({...box,enddate:e.target.value})} value={iseditBtn.enddate}   type="date" placeholder='end' className='form-control' />
            <input onChange={(e)=>setbox({...box,status:e.target.value})} value={iseditBtn.status}   type="text" placeholder='Status ' className='form-control mt-2 mb-2' />
            <input onChange={(e)=>setbox({...box,progress:e.target.value})} value={iseditBtn.progress}   type="text" placeholder='Progeressrate' className='form-control' />
            


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={onAdd} >
           Update
          </Button>
        </Modal.Footer>
      </Modal>


    </>
  )
}

export default Task
