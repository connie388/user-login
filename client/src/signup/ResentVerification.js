import React from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFetchWrapper } from "../helpers/useFetchWrapper";

function ResentVerification() {
  let params = useParams();
  let email = params.email;
  const fetchWrapper = useFetchWrapper();

  async function onSubmit(e) {
    try {
      const responseJson = await fetchWrapper.get(
        `user/resentOTP/${email}`,
        null
      );

      if (responseJson.success) {
        toast.success(responseJson.message, {
          position: toast.POSITION.TOP_LEFT,
          autoClose: false,
          closeOnClick: true,
          toastId: "customId",
        });
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

  return (
    <div className="standard-size-container">
      <div className="standard-size-form">
        <h1>VERIFY YOUR EMAIL ADDRESS</h1>
        <div>
          Before you can access your full profile, you need to verify your email
          address. We sent a verification email to {email} when you registered.
        </div>
        <br />
        <div>
          Click on the verification link in the email to activate your profile.
        </div>
        <form onSubmit={onSubmit}>
          <input type="submit" value="Resent Verification Email" />{" "}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ResentVerification;
