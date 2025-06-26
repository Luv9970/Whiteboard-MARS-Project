import React, { useRef, useState } from "react";
import "./RoomPage.css";
import Whiteboard from "../../Components/Whiteboard/Whiteboard";

const RoomPage = ({user , socket}) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#000000");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillRect = "white";
    ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

    setElements([]);
  }

  const undo = () => {
    setHistory((prevHistory) => [...prevHistory , elements[elements.length - 1]]);
    setElements(
      (prevElements) => prevElements.slice(0, prevElements.length - 1)
    )
  }

  const redo = () => {
    setElements((prevElements) => [
      ...prevElements,
      history[history.length - 1]
    ])
    setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));
  }

  return (
    <div className="row">
      <h1 className="text-center py-4">
        White Board sharing App{" "}
        <span className="text-primary">[Users Online : 0]</span>
      </h1>
      {
        user?.presenter && (<div className="col-md-14 d-flex align-items-center justify-content-around">
        <div className="d-flex mx-auto justify-content-between align-items-center gap-2">
          <div className="col-md-2 d-flex gap-1">
            <label htmlFor="pencil">Pencil</label>
            <input
              id="pencil"
              type="radio"
              name="tool"
              value="pencil"
              checked={tool === "pencil"}
              onChange={(e) => setTool(e.target.value)}
            />
          </div>

          <div className="col-md-2 d-flex gap-1">
            <label htmlFor="line">Line</label>
            <input
              id="line"
              type="radio"
              name="tool"
              value="Line"
              checked={tool === "Line"}
              onChange={(e) => setTool(e.target.value)}
            />
          </div>

          <div className="col-md-2 d-flex gap-1">
            <label htmlFor="rect">Rectangle</label>
            <input
              id="rect"
              type="radio"
              name="tool"
              value="rect"
              checked={tool === "rect"}
              onChange={(e) => setTool(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-2">
          <div className="d-flex align-items-center gap-2">
            <label htmlFor="color">Select Color</label>
            <input
              id="color"
              type="color"
              className="mt-1"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-2 d-flex gap-2">
          <button 
          className="btn btn-primary"
          disabled={elements.length === 0}
          onClick={() => undo()}>
            Undo
          </button>
          <button 
          className="btn btn-outline-primary"
          disabled={history.length < 1}
          onClick={() => redo()}>
            Redo
          </button>
        </div>

        <div className="col-md-3">
          <button onClick={handleClearCanvas} className="btn btn-danger">Clear Canvas</button>
        </div>
      </div>)
      }


      

      <div className="col-md-10 mx-auto mt-5 canvas-box">
        <Whiteboard
          canvasRef={canvasRef}
          ctxRef={ctxRef}
          elements={elements}
          setElements={setElements}
          tool={tool}
          color={color}
          user={user}
          socket={socket}
        />
      </div>
    </div>
  );
};

export default RoomPage;
