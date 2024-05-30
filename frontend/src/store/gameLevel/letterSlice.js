import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLevelData } from "../../util/api";

const initialState = {
  letters: JSON.parse(localStorage.getItem("levelSecondData")) || [],
  isLoading: false,
  error: null,
};

export const fetchContent = createAsyncThunk(
  "letter/fetchContent",
  async () => {
    const res = await fetchLevelData("second");
    const data = await res.data;
    localStorage.setItem("levelSecondData", JSON.stringify(data));
    return data;
  }
);

const letterSlice = createSlice({
  name: "letter",
  initialState,
  reducers: {
    changeLetterValue: (state, action) => {
      let lettersState = [...state.letters];
      let letter;
      let letterIndex = state.letters.findIndex(
        (item) => item._id === action.payload.id
      );
      letter = state.letters[letterIndex];
      let newletter = { ...letter, value: action.payload.value };
      lettersState[letterIndex] = newletter;
      state.letters = lettersState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.letters = action.payload;
    });
    builder.addCase(fetchContent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default letterSlice.reducer;

export const { changeLetterValue } = letterSlice.actions;
