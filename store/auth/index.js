import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    token: "",
    user: {}
}


export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addToken: (state, action) => {
            console.log('Add Auth Token');
            state.token = action.payload.token
        },
        addUser: (state, action) => {
            console.log('Add Auth User');
            state.user = action.payload.user
        }
    }
})

export const { addToken, addUser } = AuthSlice.actions

export default AuthSlice.reducer