import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../helpers/DataProvider";

function SignOut() {
  const navigate = useNavigate();
  const [authenticate, setAuthenticate] = useContext(DataContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    sessionStorage.clear();
    setAuthenticate(false);
    navigate("/", { replace: true });
  };

  return (
    <div className="standard-size-container">
      <div className="standard-size-form">
        <h1>Please confirm to logout</h1>
        <form onSubmit={onSubmit}>
          <input className="sigout-button" type="submit" value="Confirm" />
        </form>
      </div>
    </div>
  );
}

export default SignOut;
