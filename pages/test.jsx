import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Test() {
  const [data, setData] = useState({});

  const testToast = () =>
    toast.success("Toast is working!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  return (
    <>
      <div className="m-4">
        <h1>Test</h1>
        <p>{data?.msg}</p>
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary m-4 w-25" onClick={testToast}>
          <FontAwesomeIcon
            icon={faGear}
            style={{ color: "white" }}
            size="1x"
            spin
            fixedWidth
          />{" "}
          Test Toast{" "}
        </button>
      </div>
    </>
  );
}
