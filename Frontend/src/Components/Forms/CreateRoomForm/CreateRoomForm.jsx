import React, { useState } from "react";
import "./CreateRoomForm.css";
import { useNavigate } from "react-router-dom";

const CreateRoomForm = ({uuid , socket , setUser}) => {

  const [roomId , setRoomId] = useState(uuid())
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleCreateRoom = (e) => {
    e.preventDefault();

    const roomData = {
      name: name,
      roomId: roomId,
      userId: uuid(),
      host: true,
      presenter: true
  };

    setUser(roomData);
    navigate(`/${roomId}`);
    socket.emit("UserJoined", roomData) 
}



  return (
    <div>
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
              className="form-control my-2 border-0"
              placeholder="Generate Room Code"
              disabled
              value={roomId}
            />

            <div className="input-group-append ">
              <button className="btn btn-primary btn-sm me-1" onClick={() => setRoomId(uuid())} type="button">
                Generate
              </button>
              <button
                className="btn btn-outline-danger btn-sm me-2"
                type="button"
              >
                copy
              </button>
            </div>
          </div>
        </div>
        <button type="submit" onClick={handleCreateRoom} className="mt-4 btn btn-primary form-control" >
            Generate Room
        </button>
      </form>
    </div>
  );
};

export default CreateRoomForm;
