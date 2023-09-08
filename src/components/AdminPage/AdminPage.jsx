import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminForm from "./AdminForm";
import AdminRecipe from "./AdminRecipe";

function AdminPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_INGREDIENT" });
    dispatch({ type: "FETCH_RECIPE" });
  }, []);

  return (
    <>
    <h1> Admin page</h1>
      <AdminRecipe />
      <AdminForm />
    </>
  );
}

export default AdminPage;
