import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../core/api';
import { getErrorMessage } from '../../helper';

const getKitchenInfo = createAsyncThunk(
  'kitchen/get-info',
  async (body: { status: string | null; shift: string | null }, thunkApi) => {
    try {
      const response = await API.getKitchenInfo(body);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

const initialState: ReduxRequestState<KitchenStatusSlice> = {
  data: {
    orders: [],
    products: [],
    status: {
      ordered: 0,
      completed: 0,
      onTable: 0,
      total: 0,
      Prepare: 0,
    },
    options: {
      shifts: [],
      status: [],
      selectedStatus: null,
      selectedShift: null,
    },
  },
  status: 'idle',
  error: '',
};

const kitchenSlice = createSlice({
  name: 'kitchen',
  initialState,
  reducers: {
    setSocketResponseData: (
      state,
      action: { payload: KitchenSocketResponse }
    ) => {
      state.data.orders = action.payload.data;
      state.data.status = action.payload.status;
      state.data.products = action.payload.KitchenProduct;
    },
    setSelectedStatusDropdown: (state, action) => {
      state.data.options.selectedStatus = action.payload;
    },
    setSelectedShiftDropdown: (state, action) => {
      state.data.options.selectedShift = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getKitchenInfo.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(getKitchenInfo.fulfilled, (state, action) => {
        const payload = {
          products: action.payload.KitchenProduct,
          options: {
            status: action.payload.main_status.status,
            shifts: action.payload.main_status.shifts,
            selectedStatus: state.data.options.selectedStatus,
            selectedShift: state.data.options.selectedShift,
          },
          orders: action.payload.data,
          status: action.payload.status,
        };

        state.status = 'succeeded';
        state.data = payload;
      })
      .addCase(getKitchenInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default kitchenSlice.reducer;

export const {
  setSocketResponseData,

  setSelectedStatusDropdown,
  setSelectedShiftDropdown,
} = kitchenSlice.actions;

export { getKitchenInfo };
