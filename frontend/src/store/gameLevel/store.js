import { configureStore } from "@reduxjs/toolkit";
import presentSlice from "./presentSlice";
import letterSlice from "./letterSlice";
import recordSlice from "./recordSlice";
import cupcakeSlice from "./cupcakeSlice";

export const store = configureStore({
  reducer: {
    gameLevelFirst: presentSlice,
    gameLevelSecond: letterSlice,
    gameLevelThird: recordSlice,
    gameLevelFourth: cupcakeSlice,
  },
});
