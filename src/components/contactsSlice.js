import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], isLoading: false, error: null },
  reducers: {
    addContact: (state, action) => {
      state.items.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
    },
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
    setContactsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setContactsError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addContact,
  deleteContact,
  updateFilter,
  setContactsLoading,
  setContactsError,
} = contactsSlice.actions;

export const selectContacts = state => state.contacts.items;
export const selectFilter = state => state.contacts.filter;
export const selectLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;

export default contactsSlice.reducer;
