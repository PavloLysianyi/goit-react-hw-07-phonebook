import { createSlice } from '@reduxjs/toolkit';
import * as operations from './operations';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], isLoading: false, error: null, filter: '' },
  reducers: {
    updateFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(operations.fetchContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(operations.fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(operations.fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(operations.addContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(operations.addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.isLoading = false;
      })
      .addCase(operations.addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(operations.deleteContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(operations.deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
        state.isLoading = false;
      })
      .addCase(operations.deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { updateFilter } = contactsSlice.actions;

export default contactsSlice.reducer;
