import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { addUser } from '../thunks/addUser';


const usersSlice = createSlice({
    name: "users",
    initialState: {
        // isLoading: false,
        // error: null,
        data: []
    },
    // reducers: {},
    extraReducers(builder) {

        // Fetch Users
        // builder.addCase(fetchUsers.pending, (state, action) => {
        //     state.isLoading = true;
        // });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            // state.isLoading = false;
            state.data = action.payload;
        });
        // builder.addCase(fetchUsers.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.error = action.error;
        // });

        // Add User
        // builder.addCase(addUser.pending, (state, action) => {
        //     state.isLoading = true;
        // });
        builder.addCase(addUser.fulfilled, (state, action) => {
            // state.isLoading = false;
            state.data.push(action.payload);
        });
        // builder.addCase(addUser.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.error = action.error;
        // });

        // Add User
        // builder.addCase(addUser.pending, (state, action) => {

        // });
        // builder.addCase(addUser.fulfilled, (state, action) => {

        // });
        // builder.addCase(addUser.rejected, (state, action) => {

        // });
    }
});

export const usersReducer = usersSlice.reducer;