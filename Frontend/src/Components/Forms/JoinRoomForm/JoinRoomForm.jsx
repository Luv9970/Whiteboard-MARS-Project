import React, {  useState } from 'react'
import './JoinRoomForm.css'
import { Navigate } from 'react-router-dom'

const JoinRoomForm = ({uuid ,socket , setUser}) => {

  const[roomId , setRoomId]=useState("")
  const [name, setName] = useState("");

  const navigate = Navigate();

  const handleJoinRoom = (e) => {
    e.preventDefault();

    const roomData = {
      name: name,
      roomId: roomId,
      userId: uuid(),
      host: false,
      presenter: false
    };

    setUser(roomData);
    navigate(`/${roomId}`);
    socket.emit("UserJoined", roomData);
  }

  return (
      <form className="form col-md-12 mt-5">
        <div className="form-group">
          <input
            type="text"
            className="form-control my-2"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <div className="input-group d-flex align-items-center justify-content-center">
            <input
              type="text"
              className="form-control my-2"
              placeholder="Generate Room Code"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" onClick={handleJoinRoom} className="mt-4 btn btn-primary form-control">
            Generate Room
        </button>
      </form>
  )
}

export default JoinRoomForm