import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLevelData } from "../../util/api";

export const presentsData = [
  {
    id: "p1",
    name: "?",
    task: "2x+5=12",
    order: "fifth",
    backgroundColor: "#002c8a",
  },
  {
    id: "p2",
    name: "?",
    task: "-1/2^2",
    order: "first",
    backgroundColor: "#CC561E",
  },
  {
    id: "p3",
    name: "?",
    task: "2^-3",
    order: "second",
    backgroundColor: "#002c8a",
  },
  {
    id: "p4",
    name: "?",
    task: "2+2*2",
    order: "eighth",
    backgroundColor: "#CC561E",
  },
  {
    id: "p5",
    name: "?",
    task: "3+1/2+1",
    order: "sixth",
    backgroundColor: "#002c8a",
  },
  {
    id: "p6",
    name: "?",
    task: "3x=9",
    order: "fourth",
    backgroundColor: "#CC561E",
  },
  {
    id: "p7",
    name: "?",
    task: "sqrt(25)",
    order: "seventh",
    backgroundColor: "#002c8a",
  },
  {
    id: "p8",
    name: "?",
    task: "3^0",
    order: "third",
    backgroundColor: "#CC561E",
  },
];

const correctOrder = [
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eighth",
];

const initialState = {
  presents: JSON.parse(localStorage.getItem("levelFirstData")) || [],
  containerPre: [],
  value: 0,
  result: false,
  isLoading: false,
  error: null,
};

export const fetchContent2 = createAsyncThunk(
  "content/fetchContent",
  async () => {
    const res = await fetchLevelData("first");
    const data = await res.data;
    localStorage.setItem("levelFirstData", JSON.stringify(data));
    return data;
  }
);

const presentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    addToContainer: (state, action) => {
      state.value++;
      const presentId = action.payload.id.toString();

      const presentIndex = state.presents.findIndex(
        (item) => item._id === presentId
      );

      if (presentIndex === -1) {
        return;
      }

      const presentsState = state.presents.filter(
        (item) => item._id !== presentId
      );

      state.containerPre = [
        ...state.containerPre,
        state.presents[presentIndex],
      ];

      state.presents = presentsState;
    },
    addToPresents: (state, action) => {
      let presentContainer;
      let presentConatinerIndex = state.containerPre.findIndex(
        (item) => item._id === action.payload.id.toString()
      );
      presentContainer = state.containerPre[presentConatinerIndex];

      let presentContainerState = [...state.containerPre];
      presentContainerState = state.containerPre.filter(
        (item) => item._id !== action.payload.id
      );

      let presents = [...state.presents];

      let isProd = presents.findIndex((item) => item._id === action.payload.id);
      if (isProd >= 0) {
        return state;
      } else {
        presents = [...presents, presentContainer];
      }

      state.containerPre = [...presentContainerState];
      state.presents = [...presents];
    },
    changeValueTask: (state, action) => {
      let presentsState = [...state.presents];
      let present;
      let presentIndex = state.presents.findIndex(
        (item) => item._id === action.payload.id.toString()
      );
      present = state.presents[presentIndex];
      let newPresent = { ...present, name: action.payload.valueTask };

      presentsState[presentIndex] = newPresent;

      state.presents = presentsState;
    },
    checkResultGame: (state) => {
      let wrong = false;
      for (let i = 0; i < state.containerPre.length; i++) {
        if (state.containerPre[i].order === correctOrder[i]) {
          console.log(true);
        } else {
          wrong = true;
        }
      }
      if (wrong) {
        state.result = false;
      } else {
        state.result = true;
      }
    },
    clearLevelGame: (state) => {
      state.containerPre = [];
      state.presents = [];
      state.result = false;
      state.value = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContent2.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchContent2.fulfilled, (state, action) => {
      state.isLoading = false;
      state.presents = action.payload;
    });
    builder.addCase(fetchContent2.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const {
  addToContainer,
  addToPresents,
  changeValueTask,
  checkResultGame,
  fetchPresents,
  clearLevelGame,
} = presentSlice.actions;

export default presentSlice.reducer;
