import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../core/api';
import { getErrorMessage } from '../../helper';

const welcome = createAsyncThunk('status/welcome', async (_, thunkApi) => {
  try {
    const response = await API.welcome();
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

const initialState: ReduxRequestState<UserProfileStatus> = {
  data: {
    balance: 0,
    cart_count: 0,
    current_chair: false,
    current_cart: false,
    drop_down: [],
    home_routing: [],
  },
  status: 'idle',
  error: '',
};

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setUserStatus: (state, action: { payload: UserProfileStatus }) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(welcome.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(welcome.fulfilled, (state, action) => {
        const apiResponse: UserProfileStatus = {
          balance: action.payload.data.balance,
          current_chair: action.payload.data.current_chair,
          current_cart: action.payload.data.current_cart,
          home_routing: action.payload.data.home_routing,
          cart_count: action.payload.data.cart_count,
          drop_down: action.payload.data.drop_down,
        };

        state.status = 'succeeded';
        state.data = apiResponse;
      })
      .addCase(welcome.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default statusSlice.reducer;
export const { setUserStatus } = statusSlice.actions;
export { welcome };
