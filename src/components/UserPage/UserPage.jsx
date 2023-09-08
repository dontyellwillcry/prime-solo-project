import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import { useDispatch, useSelector } from "react-redux";

function UserPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_INGREDIENT" });
    dispatch({ type: "FETCH_RECIPE" });
  }, []);

  return (
    <div className="background-user">
      <UserForm />
    </div>
  );
}

export default UserPage;
