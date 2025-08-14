import { LivestockList } from "@/infrastructure/marketplace/dto/listed.livestock";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// Cart item extends livestock with quantity
export interface CartItem extends LivestockList {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add to cart or increment quantity if exists
    addToCart: (state, action: PayloadAction<LivestockList>) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (i) => i.recordId === item.recordId
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },

    // Remove item from cart by recordId
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.recordId !== action.payload
      );
    },

    // Update item quantity if it exists and quantity is valid
    updateQuantity: (
      state,
      action: PayloadAction<{ recordId: string; quantity: number }>
    ) => {
      const { recordId, quantity } = action.payload;
      const item = state.items.find((i) => i.recordId === recordId);
      if (item && quantity >= 1) {
        item.quantity = quantity;
      }
    },
  },
});

// Export actions and reducer for use in the Redux store
export const { addToCart, removeFromCart, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
