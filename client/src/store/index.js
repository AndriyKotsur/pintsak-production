import { createStore } from "redux";
import reducer from "./reducer";

let initialStore = {
  isAuth: false
};

export default createStore(reducer, initialStore);