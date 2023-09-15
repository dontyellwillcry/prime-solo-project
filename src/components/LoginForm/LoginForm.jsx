import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./LoginForm.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login
  const containerStyle = {
    maxWidth: "100", // Set the max width as needed
    marginLeft: "auto", // Move the container to the left
    marginRight: "auto",
    marginTop: "500px",
    height: "", // Adjust the top margin as needed
    // Add other inline styles here
  };

  return (
    <form onSubmit={login}>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}

      <div>
        <label htmlFor="username">
          <TextField
            variant="standard"
            type="text"
            label="Username"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          <TextField
            variant="standard"
            type="password"
            label="Password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <Button
        style={{ width: "100px", marginTop: "10px" }}
          className="btn"
          type="submit"
          name="submit"
          value="Log In"
          variant="contained"
        >
          Log In  
        </Button>
        {/* <input className="btn" type="submit" name="submit" value="Log In" /> */}
      </div>
    </form>
  );
}

export default LoginForm;
