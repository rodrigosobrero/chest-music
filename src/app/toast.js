import { createSlice } from '@reduxjs/toolkit';
let counter = 0

export const toasts = createSlice({
  name: 'toasts',
  initialState: {
    toasts: []
  },
  reducers: {
    createToast: (state, action) => {
      state.toasts.unshift({...action.payload, id: counter++});
    },
    removeFirst: (state, action) => {
      state.toasts.pop()
    },
    removeByID: (state, action) => {
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload)
      };
    },
    reset: (state) => { 
      state.toasts = [] 
    },
  }
});

export const { createToast, removeFirst, reset, removeByID } = toasts.actions;

export default toasts.reducer;