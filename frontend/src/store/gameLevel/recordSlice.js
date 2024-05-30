import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLevelData } from "../../util/api";

const initialState = {
  records: JSON.parse(localStorage.getItem("levelThirdData")) || [],
  isLoading: false,
  error: null,
};

export const fetchContent = createAsyncThunk(
  "record/fetchContent",
  async () => {
    const res = await fetchLevelData("third");
    const data = await res.data;
    localStorage.setItem("levelThirdData", JSON.stringify(data));
    return data;
  }
);

const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    changeRecordValue: (state, action) => {
      let recordsState = [...state.records];
      let record;
      let recordIndex = state.records.findIndex(
        (item) => item._id === action.payload.id
      );
      record = state.records[recordIndex];
      let newRecord = { ...record, value: action.payload.value };
      recordsState[recordIndex] = newRecord;
      state.records = recordsState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.records = action.payload;
    });
    builder.addCase(fetchContent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default recordSlice.reducer;

export const { changeRecordValue } = recordSlice.actions;
