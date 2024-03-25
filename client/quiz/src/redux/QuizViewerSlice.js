import { createSlice } from '@reduxjs/toolkit';


export const quizViewerSlice = createSlice({
  name: 'quizViewer',
  initialState: {
    mode: 'viewing', 
  },
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { setMode } = quizViewerSlice.actions;

export default quizViewerSlice.reducer;