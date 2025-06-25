import React, { useEffect, useLayoutEffect, useState } from "react";
import rough from "roughjs/bin/rough";
import "./Whiteboard.css";

const roughGenerator = rough.generator();

const Whiteboard = ({ canvasRef, ctxRef, elements, setElements, tool }) => {
  const [isDrawing, setIsdrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight * 2;
    canvas.width = window.innerWidth * 2;

    ctxRef.current = ctx;
  }, []);

  useLayoutEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current);

    if (elements.length > 0) {
      ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }

    elements.forEach((element) => {
      if (element.type === "pencil") {
        roughCanvas.linearPath(element.path);
      } else if (element.type === "line") {
        roughCanvas.draw(
          roughGenerator.line(
            element.offsetX,
            element.offsetY,
            element.endX,
            element.endY
          )
        );
      } else if (element.type === "rect") {
        roughCanvas.draw(
          roughGenerator.rectangle(
            element.offsetX,
            element.offsetY,
            element.width - element.offsetX,
            element.height - element.offsetY
          )
        );
      }
    });
  }, [elements]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "pencil") {
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
    } else if (tool === "line") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "line",
          offsetX,
          offsetY,
          endX: offsetX,
          endY: offsetY,
          stroke: "black",
        },
      ]);
    } else if (tool === "rect") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "rect",
          offsetX,
          offsetY,
          width: offsetX,
          height: offsetY,
          stroke: "black",
        },
      ]);
    }

    setIsdrawing(true);
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (isDrawing) {
      if (tool === "pencil") {
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
      } else if (tool === "line") {
        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                endX: offsetX,
                endY: offsetY,
              };
            } else {
              return ele;
            }
          })
        );
      } else if (tool === "rect") {
        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if (index == elements.length - 1) {
              return {
                ...ele,
                width: offsetX,
                height: offsetY,
              };
            } else {
              return ele;
            }
          })
        );
      }
    }
  };

  const handleMouseUp = (e) => {
    setIsdrawing(false);
  };

  return (
    <div
      className="border border-dark border-3 h-100 w-100 overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Whiteboard;






// import React, { useEffect, useLayoutEffect, useState } from "react";
// import rough from "roughjs/bin/rough"; // Make sure you're importing this way if using Vite
// import "./Whiteboard.css";

// const roughGenerator = rough.generator();

// const Whiteboard = ({ canvasRef, ctxRef, elements, setElements, tool }) => {
//   const [isDrawing, setIsDrawing] = useState(false);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     // Set high DPI canvas size
//     canvas.width = window.innerWidth * 2;
//     canvas.height = window.innerHeight * 2;
//     canvas.style.width = `${window.innerWidth}px`;
//     canvas.style.height = `${window.innerHeight}px`;

//     // Scale for retina/high-DPI
//     ctx.scale(2, 2);

//     ctxRef.current = ctx;
//   }, []);

//   useLayoutEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = ctxRef.current;

//     if (!canvas || !ctx) return; // <- ✅ guard clause

//     const roughCanvas = rough.canvas(canvas);

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     elements.forEach((element) => {
//       if (element.type === "pencil") {
//         roughCanvas.linearPath(element.path, { stroke: "black" });
//       } else if (element.type === "line") {
//         roughCanvas.draw(
//           roughGenerator.line(
//             element.offsetX,
//             element.offsetY,
//             element.endX,
//             element.endY
//           )
//         );
//       } else if (element.type === "rect") {
//         roughCanvas.draw(
//           roughGenerator.rectangle(
//             element.offsetX,
//             element.offsetY,
//             element.width - element.offsetX,
//             element.height - element.offsetY
//           )
//         );
//       }
//     });
//   }, [elements]);

//   const handleMouseDown = (e) => {
//     const { offsetX, offsetY } = e.nativeEvent;

//     if (tool === "pencil") {
//       setElements((prev) => [
//         ...prev,
//         {
//           type: "pencil",
//           path: [[offsetX, offsetY]],
//         },
//       ]);
//     } else if (tool === "line") {
//       setElements((prev) => [
//         ...prev,
//         {
//           type: "line",
//           offsetX,
//           offsetY,
//           endX: offsetX,
//           endY: offsetY,
//         },
//       ]);
//     } else if (tool === "rect") {
//       setElements((prev) => [
//         ...prev,
//         {
//           type: "rect",
//           offsetX,
//           offsetY,
//           width: offsetX,
//           height: offsetY,
//         },
//       ]);
//     }

//     setIsDrawing(true);
//   };

//   const handleMouseMove = (e) => {
//     const { offsetX, offsetY } = e.nativeEvent;
//     if (!isDrawing) return;

//     setElements((prev) =>
//       prev.map((ele, index) => {
//         if (index !== prev.length - 1) return ele;

//         if (tool === "pencil") {
//           return {
//             ...ele,
//             path: [...ele.path, [offsetX, offsetY]],
//           };
//         } else if (tool === "line") {
//           return {
//             ...ele,
//             endX: offsetX,
//             endY: offsetY,
//           };
//         } else if (tool === "rect") {
//           return {
//             ...ele,
//             width: offsetX,
//             height: offsetY,
//           };
//         }

//         return ele;
//       })
//     );
//   };

//   const handleMouseUp = () => {
//     setIsDrawing(false);
//   };

//   return (
//     <div
//       className="border border-dark border-3 h-100 w-100 overflow-hidden"
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//     >
//       <canvas ref={canvasRef} />
//     </div>
//   );
// };

// export default Whiteboard;
