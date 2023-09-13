import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import { useDispatch, useSelector } from "react-redux";
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
  return (
    <div className="background-user">
      <button onClick={toggleAudio}>Play Music</button>
      <UserForm />
    </div>
  );
}

export default UserPage;
