import { createSlice } from "@reduxjs/toolkit";

const initialState = [
	{
		id: "1",
		name: "Quang Huy",
	},
	{
		id: "2",
		name: "John Doe",
	},
	{
		id: "3",
		name: "David Degea",
	},
];

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
});

export const selectAllUsers = (state) => state.users;

const usersReducer = usersSlice.reducer;

export default usersReducer;
