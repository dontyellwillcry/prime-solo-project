import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';



function UserPage() {
  const dispatch = useDispatch();
  const audio = new Audio("/sounds/StartScreen_130bpm_3.4time_vinyl.mp3");
  audio.loop = true;
  let isMuted = true; // Initially muted

  function toggleAudio() {
    if (isMuted) {
      audio.muted = false; // Unmute
      isMuted = false;
    } else {
      audio.muted = true; // Mute
      isMuted = true;
    }
    audio.play();
  }

  useEffect(() => {
    dispatch({ type: "FETCH_INGREDIENT" });
    dispatch({ type: "FETCH_RECIPE" });
    dispatch({ type: "FETCH_FAVORITE" });
  }, []);
  const containerStyle = {
    maxWidth: '100', // Set the max width as needed
    marginLeft: '500px', // Move the container to the left
    marginRight: '0',
    marginTop: '0px', // Adjust the top margin as needed
    // Add other inline styles here
  };
  return (
    <div>
      
      <Container maxWidth="xs" style={containerStyle}>
      {/* <img src="https://media.tenor.com/42WtOr1eqBoAAAAj/chester-dst.gif" alt="Animated GIF" onClick={toggleAudio}/>
      <p>Don't Click Me</p> */}
      <FormGroup>
      <FormControlLabel control={<Checkbox defaultUnchecked onClick={toggleAudio}/>} label="Sound On/Off" />
      
    </FormGroup>
      </Container>
      
      {/* <button onClick={toggleAudio}>Play Music</button> */}

      <UserForm />
    </div>
  );
}

export default UserPage;
