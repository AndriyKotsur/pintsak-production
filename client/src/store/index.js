import { createStore } from "redux";
import reducers from "./reducers";

let initialStore = {
  isAuth: false
};

export default createStore(reducers, initialStore);