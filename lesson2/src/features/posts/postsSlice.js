import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
	{
		id: "1",
		title: "Learning Redux ToolKit",
		content: "Learn Redux Toolkit with this React Redux example project",
		date: sub(new Date(), { minutes: 10 }).toISOString(),
		reactions: {
			thumbsUp: 0,
			wow: 0,
			heart: 0,
			rocket: 0,
			coffee: 0,
		},
	},
	{
		id: "2",
		title: "Everything about Redux",
		content: "This project will help you learn more about app structure",
		date: sub(new Date(), { minutes: 5 }).toISOString(),
		reactions: {
			thumbsUp: 0,
			wow: 0,
			heart: 0,
			rocket: 0,
			coffee: 0,
		},
	},
];

export const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		postAdded: {
			reducer(state, action) {
				state.push(action.payload);
			},
			prepare(title, content, userId) {
				return {
					payload: {
						id: nanoid(),
						title,
						content,
						userId,
						date: new Date().toISOString(),
						reactions: {
							thumbsUp: 0,
							wow: 0,
							heart: 0,
							rocket: 0,
							coffee: 0,
						},
					},
				};
			},
		},
		reactionAdded(state, action) {
			const { postId, reaction } = action.payload;
			const existingPost = state.find((post) => post.id === postId);
			if (existingPost) {
				existingPost.reactions[reaction]++;
			}
		},
	},
});

export const { postAdded, reactionAdded } = postsSlice.actions;

export const selectAllPosts = (state) => state.posts;

const postsReducer = postsSlice.reducer;
export default postsReducer;
