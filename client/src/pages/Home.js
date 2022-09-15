import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../helpers/DataProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
require("dotenv").config();

function Home() {
  let params = useParams();

  let p_email = params.email;
  let p_OTP = params.OTP;

  const [authenticate, setAuthenticate] = useContext(DataContext);
  const navigate = useNavigate();

  // Verify OTP valid before go the authorized page
  useEffect(() => {
    async function verifyOTP() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/user/verifyOTP/${p_email}/${p_OTP}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        let responseJson = await response.json();

        if (responseJson.success) {
          sessionStorage.setItem("token", responseJson.token);

          let loginname =
            typeof responseJson.loginname === "undefined"
              ? ""
              : responseJson.loginname;

          sessionStorage.setItem("loginname", loginname);
          setAuthenticate(true);
          navigate("/");
        } else {
          toast.error(responseJson.message, {
            position: toast.POSITION.TOP_LEFT,
            autoClose: false,
            closeOnClick: true,
            toastId: "customId",
          });
        }
      } catch (error) {
        toast.error(error.message, {
          position: toast.POSITION.TOP_LEFT,
          autoClose: false,
          closeOnClick: true,
          toastId: "customId",
        });
      }
    }

    if (p_email && p_OTP) {
      verifyOTP();
    }
  }, [p_email, p_OTP]);

  return (
    <div>
      <h1>HOME</h1>
      <div>Welcome to the ZONE</div>
      <ToastContainer />
    </div>
  );
}

export default Home;
