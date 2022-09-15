import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CONSTANTS } from "../statics/StaticData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFetchWrapper } from "../helpers/useFetchWrapper";
require("dotenv").config();

function SignUp() {
  const navigate = useNavigate();
  const fetchWrapper = useFetchWrapper();

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUser = Object.fromEntries(formData); // convert the FormData object to a JSON object

    try {
      const responseJson = await fetchWrapper.post(
        `${process.env.REACT_APP_API_URL}/user/signup`,
        newUser
      );

      // const response = await fetch(
      //   `${process.env.REACT_APP_API_URL}/user/signup`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(newUser),
      //   }
      // );

      // let responseJson = await response.json();
      if (responseJson.success) {
        formData.set("name", "");
        formData.set("email", "");
        formData.set("password", "");
        navigate(`/resent-verification/${newUser.email}`);
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
        <h1>Sign up with email</h1>
        <p>
          Sign up to get newsletter, coupons, create shopping list, and more.
        </p>
        <form onSubmit={onSubmit}>
          <fieldset>
            <label>
              Name (For Greeting): <input type="text" name="name" required />
            </label>
            <label>
              Email address:{" "}
              <input
                type="email"
                name="email"
                // pattern="/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/"
                required
              />
            </label>
            <label>
              Password:
              <input
                id="password"
                type="password"
                name="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
              />
            </label>

            <p>
              By creating an account, you agree to the&nbsp;
              <Link
                to={`/pdf-reader?filename=${CONSTANTS.TERMS_OF_SERVICE_FILE}`}
              >
                Terms of Service
              </Link>
              &nbsp;and&nbsp;
              <Link
                to={`/pdf-reader?filename=${CONSTANTS.PRIVACY_POLICY_FILE}`}
              >
                Privacy Policy
              </Link>
            </p>
          </fieldset>
          <input type="submit" value="Submit" />
        </form>
        <div>
          Already have an account? <Link to="/sign-in">Sign In</Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
