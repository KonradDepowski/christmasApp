import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLevelData } from "../../util/api";

const initialState = {
  cupcakes: JSON.parse(localStorage.getItem("levelFourthData")) || [],
  container: [],
  result: false,
  isLoading: false,
  error: null,
};

export const fetchContent = createAsyncThunk(
  "cupcake/fetchContent",
  async () => {
    const res = await fetchLevelData("fourth");
    const data = await res.data;
    localStorage.setItem("levelFourthData", JSON.stringify(data));
    return data;
  }
);

const cupcakeSlice = createSlice({
  name: "cupcake",
  initialState,
  reducers: {
    addToContainer: (state, action) => {
      let cupcake;
      let cupcakeIndex = state.cupcakes.findIndex(
        (item) => item._id === action.payload.id
      );

      cupcake = state.cupcakes[cupcakeIndex];

      let cupcakesState = [...state.cupcakes];
      cupcakesState = state.cupcakes.filter(
        (item) => item._id !== action.payload.id
      );

      let containerProd = [...state.container];

      let isProd = containerProd.findIndex(
        (item) => item._id === action.payload.id
      );
      if (isProd >= 0) {
        return;
      } else {
        containerProd = [...state.container, cupcake];
      }

      state.cupcakes = cupcakesState;
      state.container = [...containerProd];
    },
    clearContainer: (state) => {
      state.container = [];
    },
    checkIsValid: (state) => {
      if (
        state.container.length === 8 &&
        state.container.every((item) => item.valid === true)
      ) {
        state.result = true;
      } else {
        state.result = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cupcakes = action.payload;
    });
    builder.addCase(fetchContent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { addToContainer, clearContainer, checkIsValid } =
  cupcakeSlice.actions;
export default cupcakeSlice.reducer;
