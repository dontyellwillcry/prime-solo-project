import RecipeForm from "../RecipeForm/RecipeForm";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminForm from "./AdminForm";

function AdminPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_INGREDIENT" });
    dispatch({ type: "FETCH_RECIPE" });
  }, []);

  return (
    <>
    <h1> Admin page</h1>
      <RecipeForm />
      <AdminForm />
    </>
  );
}

export default AdminPage;
