import React, { useEffect } from "react";
import Event from "./Event";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { toast } from "react-toastify";
import ClientApi from "./ClientApi";

export default function Layout({ children }) {

  useEffect(async () => {
    await ClientApi.checkToken();
    Event.on("token:expired", () => {
      toast.error("Your session has expired. Please login again.");
    });

    Event.once("welcome", (user) => {
      toast.success("Welcome back, " + user.fullname.split(" ")[0] + "!");
    });

  }, []);

  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
