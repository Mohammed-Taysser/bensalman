import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../core/api';
import { getErrorMessage } from '../../helper';

const getCartItems = createAsyncThunk('cart/get-items', async (_, thunkApi) => {
  try {
    const response = await API.getCartItems();
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

const checkout = createAsyncThunk('cart/checkout', async (_, thunkApi) => {
  try {
    const response = await API.checkout();
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

const modifyCartQuantity = createAsyncThunk(
  'cart/modify-quantity',
  async (body: ModifyQuantityRequestBody, thunkApi) => {
    try {
      const response = await API.modifyCartQuantity(body);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

const initialState: ReduxRequestState<CartStatusSlice> = {
  data: {
    items: [],
    total_items: 0,
    total_amount: 0,
    status: 'Ordered',
    current_cart: '',
    loading: [],
  },
  status: 'idle',
  error: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Get Cart items
      .addCase(getCartItems.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        const payload = {
          total_items: action.payload.data.total_items,
          total_amount: action.payload.data.total_amount,
          status: action.payload.data.status,
          current_cart: action.payload.data.current_cart,
          items: action.payload.data.items,
          loading: state.data.loading,
        };

        state.status = 'succeeded';
        state.data = payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Modify Cart items Quantity
      .addCase(modifyCartQuantity.pending, (state, action) => {
        state.error = '';
        const clonedLoadingState = [...state.data.loading];

        clonedLoadingState.push(action.meta.arg.item);

        state.data.loading = clonedLoadingState;
      })
      .addCase(modifyCartQuantity.fulfilled, (state, action) => {
        // handel if item quantity === 0
        const clonedItems = [...state.data.items];
        const itemIndex = clonedItems.findIndex(
          (item: CartProduct) => item.item_name === action.meta.arg.item
        );

        if (itemIndex !== -1) {
          if (action.meta.arg.qty === 0) {
            clonedItems.splice(itemIndex, 1);
          } else {
            clonedItems[itemIndex].cart_qty = action.meta.arg.qty;
          }
        }

        // handel loading
        const clonedLoadingState = [...state.data.loading];

        const index = clonedLoadingState.indexOf(action.meta.arg.item);

        if (index !== -1) {
          clonedLoadingState.splice(index, 1);
        }

        // set whole state with new updates
        const payload = {
          total_items: action.payload.data.total_items,
          total_amount: action.payload.data.total_amount,
          status: action.payload.data.status,
          current_cart: action.payload.data.current_cart,
          loading: clonedLoadingState,
          items: clonedItems,
        };

        state.status = 'succeeded';
        state.data = payload;
      })
      .addCase(modifyCartQuantity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;

        const clonedLoadingState = [...state.data.loading];

        const index = clonedLoadingState.indexOf(action.meta.arg.item);

        if (index !== -1) {
          clonedLoadingState.splice(index, 1);
        }

        state.data.loading = clonedLoadingState;
      })

      // Checkout
      .addCase(checkout.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(checkout.fulfilled, (state) => {
        state.status = 'succeeded';
        state.data.items = [];
        state.data.total_amount = 0;
        state.data.total_items = 0;
      })
      .addCase(checkout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
export { checkout, getCartItems, modifyCartQuantity };
