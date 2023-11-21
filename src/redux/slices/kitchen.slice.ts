import { createSlice } from '@reduxjs/toolkit';

const initialState: RequestState<KitchenStatusSlice> = {
  data: {
    orders: [],
    products: [],
    status: {
      ordered: 0,
      completed: 0,
      onTable: 0,
      total: 0,
    },
    options: {
      shift: [],
      status: [],
    },
  },
  status: 'idle',
  error: '',
};

const kitchenSlice = createSlice({
  name: 'kitchen',
  initialState,
  reducers: {},
});

export default kitchenSlice.reducer;
