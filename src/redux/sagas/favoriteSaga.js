import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchFavorite() {
  console.log("inside of recipe SAGA");
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const response = yield axios.get("/api/favorites", config);

    yield put({ type: "COLLECT_FAVORITE", payload: response.data });
  } catch (error) {
    console.log("COLLECT_RECIPE get request failed", error);
  }
}

function* addFavorite(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      
    };
    console.log("Payload:", action.payload);
    const payloadJSON = JSON.stringify(action.payload);

    // Using 'yield' to wait for the POST request to complete
    yield axios.post("/api/favorites", payloadJSON, config);
    
    // Dispatching an action to fetch the latest elements list
    yield put({ type: "FETCH_FAVORITE" });
  } catch (error) {
    console.log("error posting a favorites", error);
  }
}

function* deleteFavorite(action) {
  try {
    yield axios.delete(`/api/favorites/${action.payload}`);
    yield put({ type: "FETCH_FAVORITE" });
  } catch (error) {
    console.log("error in Delete", error);
  }     
}

function* favoriteSaga() {
  yield takeLatest("FETCH_FAVORITE", fetchFavorite);
  yield takeLatest("SAVE_FAVORITE", addFavorite);
  yield takeLatest("DELETE_FAVORITE", deleteFavorite);
}

export default favoriteSaga;
