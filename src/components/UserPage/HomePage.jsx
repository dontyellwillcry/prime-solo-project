import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import { useDispatch, useSelector } from "react-redux";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import "./HomePage.css";



function Homeage() {
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

  return (
    <>
      <div className="music">
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultUnchecked onClick={toggleAudio} />} label="Music On/Off" />
        </FormGroup>
      </div>
      <UserForm />
    </>
  );
}

export default Homeage;
