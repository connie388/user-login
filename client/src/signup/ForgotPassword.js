import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFetchWrapper } from "../helpers/useFetchWrapper";

function ForgotPassword() {
  const navigate = useNavigate();
  const fetchWrapper = useFetchWrapper();

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = Object.fromEntries(formData); // convert the FormData object to a JSON object

    // call resetPassword so that server will sent an email to user with a ticket
    // to update new password

    try {
      const responseJson = await fetchWrapper.post(
        `user/resetPwdRequest`,
        email
      );
    
      if (responseJson.success) {
        formData.set("email", "");
        navigate("/thank-you");
      } else {
        toast.error(responseJson.message, {
          position: toast.POSITION.TOP_LEFT,
          autoClose: false,
          closeOnClick: true,
          toastId: "customId",
        });
      }
    } catch (error) {}
  }

  return (
    <div className="standard-size-container">
      <div className="standard-size-form">
        <h1>FORGOT PASSWORD</h1>

        <form onSubmit={onSubmit}>
          <fieldset>
            <label>Please enter the email you've using for your account.</label>
            <label>
              Email address: <input type="email" name="email" required />
            </label>
          </fieldset>
          <input type="submit" value="Continue" />
        </form>
        <div>
          Have an account? <Link to="/sign-in">Sign in</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ForgotPassword;
