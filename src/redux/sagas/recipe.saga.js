import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchRecipe() {
    console.log("inside of recipe SAGA")
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };


    const response = yield axios.get('/api/recipe', config);


    yield put({ type: 'COLLECT_RECIPE', payload: response.data });
  } catch (error) {
    console.log('COLLECT_RECIPE get request failed', error);
  } 
}


// function* sendRecipe(action) {
//   try {
//     const config = {
//       headers: { 'Content-Type': 'application/json' },
//       withCredentials: true,
//     };

//     // Assuming 'action.payload' contains the form data
//     const response = yield axios.post('/api/recipe', action.payload, config);

//     yield put({ type: 'FETCH_RECIPE', payload: response.data });
//   } catch (error) {
//     console.log('SAVE_RECIPE', error);
//     yield put({ type: 'RECIPE_SENT_FAILED', payload: error.message });
//   }
// }
function* sendRecipe(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    // Using 'yield' to wait for the POST request to complete
    yield axios.post("/api/recipe", action.payload, config);
    // Dispatching an action to fetch the latest elements list
    yield put({ type: "FETCH_RECIPE" });
  } catch (error) {
    console.log("error posting a recipe", error);
  }
}

function* deleteRecipe(action) {
  try {
    yield axios.delete(`/api/recipe/${action.payload}`);
    yield put({ type: "FETCH_RECIPE" });
  } catch (error) {
    console.log("error in Delete", error);
  }
}


function* updateRecipe(action) {
  try {
    const updatedRecipeData = action.payload; 
    yield axios.put(`/api/recipe/${updatedRecipeData.id}`, updatedRecipeData);
    yield put({ type: "FETCH_RECIPE" });
  } catch (error) {
    console.log("error sending put", error);
  }
}


function* recipeSaga() {
  yield takeLatest('FETCH_RECIPE', fetchRecipe);
  yield takeLatest('SAVE_RECIPE', sendRecipe);
  yield takeLatest('DELETE_RECIPE', deleteRecipe);
  yield takeLatest('EDIT_RECIPE', updateRecipe);

}

export default recipeSaga;