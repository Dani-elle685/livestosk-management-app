import { LivestockList } from "@/infrastructure/marketplace/dto/listed.livestock";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishListState{
    items:LivestockList[]
}
const initialState: WishListState = {
  items: [],
};

const wishlistSlice = createSlice ({
    name:"wishlist",
    initialState,
    reducers:{
        //add to wishlist
        addToWishList: (state, action: PayloadAction<LivestockList>) =>{
            const item = action.payload;
            if(!state.items.some((existingItem)=> existingItem.recordId === item.recordId)){
                state.items.push(item);
            }
        },

        //remove item from wishlist by Id
        removeFromWishList:(state, action: PayloadAction<string>) =>{
            state.items = state.items.filter((item)=> item.recordId !== action.payload)
        }
    }
})

export const {addToWishList, removeFromWishList} = wishlistSlice.actions;
export default wishlistSlice.reducer;