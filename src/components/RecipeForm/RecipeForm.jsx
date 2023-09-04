import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const RecipeForm = () => {
    const dispatch = useDispatch();


  const [formData, setFormData] = useState({
    name: '',
    health: 0,
    hunger: 0,
    sanity: 0,
    ingredient_ids: [],
    description: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDispatch = () => {
    // Define the action type and payload directly and dispatch it
    const action = {
      type: 'SAVE_RECIPE',
      payload: formData,
    };
    dispatch(action);
  };

  return (
    <div>
      <h2>Create a New Recipe</h2>
      <form onSubmit={handleDispatch}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="health">Health:</label>
          <input
            type="number"
            id="health"
            name="health"
            value={formData.health}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="hunger">Hunger:</label>
          <input
            type="number"
            id="hunger"
            name="hunger"
            value={formData.hunger}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="sanity">Sanity:</label>
          <input
            type="number"
            id="sanity"
            name="sanity"
            value={formData.sanity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="ingredient_ids">Ingredient IDs (comma-separated):</label>
          <input
            type="text"
            id="ingredient_ids"
            name="ingredient_ids"
            value={formData.ingredient_ids}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;
