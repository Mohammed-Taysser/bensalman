import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../core/api';
import LOCAL_STORAGE from '../../core/localStorage';
import routes from '../../core/routes';
import { getErrorMessage } from '../../helper';

const login = createAsyncThunk(
  'auth/login',
  async (body: LoginRequestBody, thunkApi) => {
    try {
      const response = await API.login(body);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

const initialState: ReduxRequestState<AuthUser> = {
  data: {
    api_key: '',
    api_secret: '',
    routes: [],
    full_name: '',
    sid: '',
    ...LOCAL_STORAGE.get('authUser'),
  },
  status: 'idle',
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data.api_key = '';
      state.data.api_secret = '';

      LOCAL_STORAGE.remove('authUser');

      routes.navigate('/login');
    },

    setAuthRoutes: (state, action: { payload: string[] }) => {
      state.data.routes = action.payload;
      LOCAL_STORAGE.set('authUser', {
        ...state.data,
        routes: action.payload,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        const apiResponse: AuthUser = {
          api_secret: action.payload.data.api_secret,
          routes: action.payload.data.routing,
          sid: action.payload.data.sid,
          api_key: action.payload.data.api_key,
          full_name: action.payload.data.full_name,
        };

        state.status = 'succeeded';
        state.data = apiResponse;
        LOCAL_STORAGE.set('authUser', apiResponse);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
export const { logout, setAuthRoutes } = authSlice.actions;
export { login };
