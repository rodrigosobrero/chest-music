export const getModalList = state =>
  Object.keys(state.modal).filter(modalId => state.modal[modalId].open);

export const isModalOpen = (state, id) => state.modal[id]?.open ?? false;

export const getModalMeta = (state, id) => state.modal[id]?.meta;

