import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminForm from "./AdminForm";
import AdminRecipe from "./AdminRecipe";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


function AdminPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_INGREDIENT" });
    dispatch({ type: "FETCH_RECIPE" });
  }, []);

  return (
    <>
    <h1> Admin page</h1>
    <Container maxWidth="sm">
    <Grid container rowSpacing={1} columnSpacing={{xs: 1 }}>
    <Grid item xs={6}>
      <AdminRecipe />
      </Grid>
      <Grid item xs={6}>
      <AdminForm />
      </Grid>
      </Grid>
      </Container>
    </>
  );
}

export default AdminPage;
