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

function* recipeSaga() {
  yield takeLatest('FETCH_RECIPE', fetchRecipe);
}

export default recipeSaga;