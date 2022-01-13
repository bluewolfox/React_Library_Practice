import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type T_Alert = {
  msg: string;
  type: 'success' | 'err' | 'warn';
};

interface State {
  items: T_Alert[];
}

const initialState: State = {
  items: [],
};

export const alertSlice = createSlice({
  initialState,
  name: 'alert',
  reducers: {
    reset: (state) => {
      state.items = [];
    },
    add: (state, { payload }: PayloadAction<T_Alert>) => {
      state.items.push(payload);
    },
    delete: (state, { payload }: PayloadAction<number>) => {
      state.items[payload].msg = '';
    },
  },
});
export const alertActions = alertSlice.actions;
