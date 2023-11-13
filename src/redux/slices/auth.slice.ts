import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { API } from '../../core/api';
import { LocalStorage } from '../../core/localStorage';
import routes from '../../core/routes';

const login = createAsyncThunk(
  'auth/login',
  async (body: LoginBodyState, thunkApi) => {
    try {
      const response = await API.login(body);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ResponseError>;

      return thunkApi.rejectWithValue(error?.response?.data.message);
    }
  }
);

const initialState: RequestState<AuthUser> = {
  data: {
    api_key: '',
    api_secret: '',
    routes: [],
    sid: '',
    ...LocalStorage.get('authUser'),
  },
  status: 'idle',
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      LocalStorage.remove('authUser');
      routes.navigate('/login');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        const apiResponse = {
          api_secret: action.payload.data.api_secret,
          routes: action.payload.data.routing,
          sid: action.payload.data.sid,
          api_key: action.payload.data.api_key,
        };

        state.status = 'succeeded';
        state.data = apiResponse;
        LocalStorage.set('authUser', apiResponse);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
export { login };
