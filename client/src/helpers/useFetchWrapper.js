import  { useContext } from "react";
import { DataContext } from "./DataProvider";
require("dotenv").config();

export const useFetchWrapper = () => {
  const [authenticate, setAuthenticate] = useContext(DataContext);

  return {
    get: request("GET"),
    post: request("POST"),
    put: request("PUT"),
    delete: request("DELETE"),
  };

  function request(method) {
    return (url, body, token) => {
      const requestOptions = {
        method,
        headers: authHeader(url, token),
      };
      if (body) {
        requestOptions.headers["Content-Type"] = "application/json";
        // requestOptions.headers["credentials"] = "include";
        requestOptions.body = JSON.stringify(body);
      }
    
      return fetch(url, requestOptions).then(handleResponse);
    };
  }

  // helper functions

  function authHeader(url, token) {
    const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL);
    if (token && isApiUrl) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  }

  function handleResponse(response) {
    return response.json().then((json) => {
      // const data = text && JSON.parse(text);

      if (response.status === 401 || response.status === 403) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        sessionStorage.clear();
        setAuthenticate(false);
      }

      return json;
    });
  }
};
