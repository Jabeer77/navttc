import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IProduct } from '@/types'

export interface CartItem {
  product: IProduct;
  quantity: number;
  color: string;
  size: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.product._id === action.payload.product._id)
      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.product._id !== action.payload)
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.product._id === action.payload)
      if (item) {
        item.quantity++
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.product._id === action.payload)
      if (item && item.quantity > 1) {
        item.quantity--
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions

export default cartSlice.reducer
