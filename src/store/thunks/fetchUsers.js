import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// "users/fetch" is a base type
const fetchUsers = createAsyncThunk('users/fetch', async () => {
    const response = await axios.get('http://localhost:3005/users');

    // TODO: Delete this Dev Only
    await pause(1000);
    // Automaticall assigned to the payload property of the action
    return response.data;
});

// TODO: Delete this Dev Only

const pause = async (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

export { fetchUsers };