import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

function AdminEdit({id}) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    health: 0,
    hunger: 0,
    sanity: 0,
    ingredient_ids: [],
    description: "",
    image: "",
    id: id,
    
  });

  const handleChange = (event) => {
    event.preventDefault(); 
    const { name, value } = event.target;
    const newValue = name === "ingredient_ids" ? value.split(",").map(id => parseInt(id.trim())) : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleDispatch = (event) => {
    event.preventDefault();
    console.log("info to efit", formData)

    const action = {
      type: "EDIT_RECIPE",
      payload: formData,
    };
    dispatch(action);
    handleClose()
    console.log("Here is the action", action)

  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  return (
    <div>
      <Button onClick={handleOpen}style={{ color: 'yellow' }}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style} >
          <h2>Update Recipe</h2>
          <form onSubmit={handleDispatch}>
            <div>
              {/* <label htmlFor="name">Name:</label> */}
              <TextField
                label="Name"
                variant="filled"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                size="small"
              />
            </div>
            <div>
              {/* <label htmlFor="health">Health:</label> */}
              <TextField
                label="Health"
                variant="filled"
                type="number"
                id="health"
                name="health"
                value={formData.health}
                onChange={handleChange}
                size="small"
              />
            </div>
            <div>
              {/* <label htmlFor="hunger">Hunger:</label> */}
              <TextField
                label="Hunger"
                variant="filled"
                type="number"
                id="hunger"
                name="hunger"
                value={formData.hunger}
                onChange={handleChange}
                size="small"
              />
            </div>
            <div>
              {/* <label htmlFor="sanity">Sanity:</label> */}
              <TextField
                label="Sanity"
                variant="filled"
                type="number"
                id="sanity"
                name="sanity"
                value={formData.sanity}
                onChange={handleChange}
                size="small"
              />
            </div>
            <div>
              {/* <label htmlFor="ingredient_ids">
                Ingredient IDs (comma-separated):
              </label> */}
              <TextField
                label="Ingredient Id's"
                variant="filled"
                type="text"
                id="ingredient_ids"
                name="ingredient_ids"
                value={formData.ingredient_ids}
                onChange={handleChange}
                size="small"
              />
            </div>
            <div>
              {/* <label htmlFor="description">Description:</label> */}
              <TextField
                label="Description"
                // placeholder="Placeholder"
                multiline
                variant="standard"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                size="small"
              />
            </div>
            <div>
              {/* <label htmlFor="image">Image URL:</label> */}
              <TextField
                label="Image"
                variant="filled"
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                size="small"
              />
            </div>
            <button type="submit" >Update Recipe</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AdminEdit;
