import { createAction, createReducer } from '@reduxjs/toolkit';

const openModal = createAction('modal/open', (modalFileName, meta) => {
  return {
    payload: {
      modalFileName,
      meta
    }
  }
});

const closeModal = createAction('modal/close', (modalFileName) => {
  return {
    payload: { modalFileName }
  }
});

const initialState = {};

const modalReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(openModal, (state, action) => {
      const id = action.payload.modalFileName;
      const meta = action.payload.meta;

      return {
        ...state.modal,
        [id]: { id, meta, open: true }
      }

    })
    .addCase(closeModal, (state, action) => {
      const id = action.payload.modalFileName;

      return {
        ...state.modal,
        [id]: { id, open: false }
      }

    })
});

export { modalReducer, closeModal, openModal };