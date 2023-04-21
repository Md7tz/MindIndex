import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Test() {
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/test", {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charSet=UTF-8",
            Accept: "application/json, text/plain, */*",
            "Cache-Control": "no-cache",
          },
        });
        const data = await res.json();
        console.log(data);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const testToast = () =>
    toast.success("Toast is working!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
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
          <FontAwesomeIcon
            icon={faGear}
            style={{ color: "white" }}
            size="1x"
            spin
            fixedWidth
          />
        </button>
        
      </div>
    </>
  );
}
