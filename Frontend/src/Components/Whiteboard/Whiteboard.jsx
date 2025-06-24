import React, { useEffect, useLayoutEffect, useState } from "react";
import rough from "roughjs";
import "./Whiteboard.css";

const roughGenerator = rough.generator();

const Whiteboard = ({ canvasRef, ctxRef, elements, setElements }) => {
  const [isDrawing, setIsdrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctxRef.current = ctx;
  }, []);

  useLayoutEffect(()=>{
    const roughCanvas = rough.canvas(canvasRef.current);

    elements.forEach((element) => {
      roughCanvas.linearPath(element.path)
    })
  },[elements])

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    setElements((prevElements) => [
      ...prevElements,
      {
        type: "pencil",
        offsetX,
        offsetY,
        path: [[offsetX, offsetY]],
        stroke: "black",
      },
    ]);

    setIsdrawing(true);
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (isDrawing) {
      const { path } = elements[elements.length - 1];
      const newPath = [...path, [offsetX, offsetY]];

      setElements((prevElements) => 
        prevElements.map((ele, index) => {
          if (index == elements.length - 1) {
            return {
              ...ele,
              path: newPath,
            };
          } else {
            return ele;
          }
        })
      );
    }
  }; 

  const handleMouseUp = (e) => {
    setIsdrawing(false);
  };

  return (
  
      <canvas
        className="border border-dark border-3 h-100 w-100"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={canvasRef}
      ></canvas>
  );
};

export default Whiteboard;
