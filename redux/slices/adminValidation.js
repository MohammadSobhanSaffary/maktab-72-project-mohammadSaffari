import { createSlice } from "@reduxjs/toolkit";

const slice=createSlice({
    name:'loginValidation',
    initialState:{
        value:'',    
    },
    reducers:{
        setValidation:(state,action)=>{
            state.value=action.payload;
        }
    }
})
export const {setValidation}=slice.actions;
export default slice.reducer;