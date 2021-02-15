import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cleanProcess, mainProcess } from "../../process/processor";

export type TextState = {
  tabIndex: number;
  processed: string;
  original: string;
  clean: string;
};

export const initialState: TextState = {
  tabIndex: 0,
  processed: "",
  original: "",
  clean: "",
};

export const textSlice = createSlice({
  // slice名
  name: "text",
  initialState,
  reducers: {
    setOriginalText: (state: TextState, action: PayloadAction<string>) => {
      state.original = action.payload;
      // console.log("setOriginalText", action.payload);
      state.clean = "";
      state.processed = mainProcess(state.original);
    },
    setCleanText: (state: TextState, action: PayloadAction<string>) => {
      if (state.clean.length === 0) {
        state.clean = cleanProcess(state.original);
      }
    },
    setTabIndex: (state: TextState, action: PayloadAction<number>) => {
      state.tabIndex = action.payload;
    },
  },
});

// 外からインポートするためにactionとreducerをエクスポートする
export const { setOriginalText, setCleanText, setTabIndex } = textSlice.actions;
export default textSlice.reducer;
