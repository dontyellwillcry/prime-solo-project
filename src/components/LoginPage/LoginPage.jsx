import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";
import "./LoginPage.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function LoginPage() {
  const history = useHistory();
  const containerStyle = {
    maxWidth: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "450px",
  };

  const cardStyle = {
    maxWidth: "400px", // Set the max width of the card
    margin: "0 auto", // Center the card horizontally
    padding: "20px", // Add some padding
    border: "5px solid yellow", // Add a border
    borderRadius: "5px", // Add border radius
    backdropFilter: "blur(20px)",
  };

  return (
    <div className="background-image">
      <Container style={containerStyle}>
        <Card
          variant="outlined"
          style={cardStyle}
          sx={{
            maxWidth: 300,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div" align="center">
              Login
            </Typography>
            <LoginForm />
            <div align="center">
              <Button
                variant="contained"
                style={{ width: "100px", marginTop: "10px" }}
                type="button"
                className="btn btn_asLink"
                onClick={() => {
                  history.push("/registration");
                }}
              >
                Register
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default LoginPage;
