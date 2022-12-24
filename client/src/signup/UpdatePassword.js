import React from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFetchWrapper } from "../helpers/useFetchWrapper";

function UpdatePassword() {
  let params = useParams();
  let userId = params.userId;
  let token = params.token;
  const fetchWrapper = useFetchWrapper();

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData); // convert the FormData object to a JSON object
    if (data.password !== data.confirmPassword) {
      toast.error(
        "Please ensure the password and the confirmation are the same.",
        {
          position: toast.POSITION.TOP_LEFT,
          autoClose: false,
          closeOnClick: true,
          toastId: "customId",
        }
      );
      return;
    }

    try {
      let password = data.password;

      const responseJson = await fetchWrapper.put(
        `user/updatePassword`,
        {
          userId: userId,
          password: password,
        },
        token
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
        <h1>RESET PASSWORD</h1>

        <form onSubmit={onSubmit}>
          <fieldset>
            <label>Enter a new password</label>

            <input
              type="password"
              name="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              default="Your new password"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              default="Confirm your new password"
              required
            />
          </fieldset>
          <input type="submit" value="Continue" />
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UpdatePassword;
