import React from "react";

export default function Footer() {
  return (
    <footer className="py-5">
      <div className="container d-flex justify-content-start">
        <p className="m-0 p-0 text-center">Copyright &copy; MindIndex {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
