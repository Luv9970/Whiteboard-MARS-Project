import React from "react";
import "./CreateRoomForm.css";

const CreateRoomForm = () => {
  return (
    <div>
      <form className="form col-md-12 mt-5">
        <div className="form-group">
          <input
            type="text"
            className="form-control my-2"
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <div className="input-group d-flex align-items-center justify-content-center">
            <input
              type="text"
              className="form-control my-2 border-0"
              placeholder="Generate Room Code"
              disabled
            />

            <div className="input-group-append ">
              <button className="btn btn-primary btn-sm me-1" type="button">
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
        <button type="submit" className="mt-4 btn btn-primary form-control" >
            Generate Room
        </button>
      </form>
    </div>
  );
};

export default CreateRoomForm;
