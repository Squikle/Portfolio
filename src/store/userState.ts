import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./types";

const userState: UserState = {
  parallaxHover: false,
  parallaxTextTap: false,
};

const slice = createSlice({
  name: "userState",
  initialState: userState,
  reducers: {
    parallaxHovered: (userState) => {
      return {
        ...userState,
        parallaxHover: true,
      };
    },
    parallaxTextTapped: (userState) => {
      return {
        ...userState,
        parallaxTextTap: true,
      };
    },
  },
});

export const { parallaxHovered, parallaxTextTapped } = slice.actions;

export default slice.reducer;
