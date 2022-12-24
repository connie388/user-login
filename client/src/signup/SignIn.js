import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../helpers/DataProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useFetchWrapper } from "../helpers/useFetchWrapper";

function SignIn() {
  const [authenticate, setAuthenticate] = useContext(DataContext);
  const navigate = useNavigate();
  const fetchWrapper = useFetchWrapper();

  async function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData); // convert the FormData object to a JSON object

    try {
      const responseJson = await fetchWrapper.post(
        `user/verify`,
        user
      );

      if (responseJson.success) {
        sessionStorage.setItem("token", responseJson.token);

        let loginname =
          typeof responseJson.loginname === "undefined"
            ? ""
            : responseJson.loginname;

        sessionStorage.setItem("loginname", loginname);
        setAuthenticate(true);
        formData.set("name", "");
        formData.set("email", "");
        formData.set("password", "");

        navigate("/");
      } else {
        toast.error(responseJson.message, {
          position: toast.POSITION.TOP_LEFT,
          autoClose: false,
          closeOnClick: true,
          // toastId: "customId",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: false,
        closeOnClick: true,
        // toastId: "customId",
      });
    }
  }

  return (
    <div className="standard-size-container">
      <div className="standard-size-form">
        <h1>Sign in with email</h1>

        <form onSubmit={onSubmit}>
          <fieldset>
            <label>
              Email address:
              <input type="email" name="email" required />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                // pattern="[a-z0-5]{8,}"
                required
              />
            </label>
            <p>
              Forgot your password?{" "}
              <Link to="/forgot-password">Reset password</Link>
            </p>

            <p>
              Don't have an account? <Link to="/sign-up">Sign up</Link>
            </p>
          </fieldset>
          <input type="submit" value="Submit" />
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignIn;
