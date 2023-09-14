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
  const BlurredBackground = styled('div')({
    backdropFilter: 'blur(20px)', // Adjust the blur intensity as needed
    position: 'absolute',
    top: 150,
    left: 200,
    right: 200,
    width: '80%',
    height: '90%',
    zIndex: -1,
    
    // You may also want to set opacity for better readability of the content
    // opacity: 0.8, // Adjust the opacity as needed
  });

  return (
    <>
    <BlurredBackground />
    <h1> Admin page</h1>
    <Container maxWidth="sm" style={{ width: '90%', margin: '20px 800px' }}>
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
