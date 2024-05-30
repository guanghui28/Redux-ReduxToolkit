import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USER_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
	try {
		const res = await axios.get(USER_URL);
		return res.data;
	} catch (error) {
		return error.message;
	}
});

const initialState = [];

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			return action.payload;
		});
	},
});

export const selectAllUsers = (state) => state.users;

const usersReducer = usersSlice.reducer;

export default usersReducer;
