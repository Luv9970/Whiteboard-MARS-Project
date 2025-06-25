import React from 'react'
import './Form.css'
import JoinRoomForm from './JoinRoomForm/JoinRoomForm'
import CreateRoomForm from './CreateRoomForm/CreateRoomForm'

const Form = ({uuid ,socket , setUser}) => {
  return (
    <div className='row h-100 pt-5'>
        <div className="form-box p-5 col-md-4 mx-auto mt-5 border border-primary rounded-2 d-flex flex-column align-items-center">
            <h1 className="text-primary pw-bold">Join Room</h1>
            <JoinRoomForm  uuid={uuid} socket={socket} setUser = {setUser}/>
        </div>
        <div className="form-box p-5 col-md-4 mx-auto mt-5 border border-primary rounded-2 d-flex flex-column align-items-center">
            <h1 className="text-primary pw-bold">Create Room</h1>
            <CreateRoomForm uuid={uuid} socket={socket} setUser = {setUser}/>
        </div>
    </div>
  )
}
 
export default Form