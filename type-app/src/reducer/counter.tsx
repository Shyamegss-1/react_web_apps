import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface nn {
  count: number;
}

const state: nn = {
  count: 0,
};

const CountReducer = createSlice({
  name: "count reducer",
  initialState: state,
  reducers: {
    increment(state) {
      state.count += 1;
    },

    decrement: (state) => {
      state.count -= 1;
    },

    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = CountReducer.actions;

export default CountReducer.reducer;
