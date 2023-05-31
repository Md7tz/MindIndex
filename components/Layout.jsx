import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
