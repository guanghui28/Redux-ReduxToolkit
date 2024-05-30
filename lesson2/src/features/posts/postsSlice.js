import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = {
	posts: [],
	status: "idle",
	error: null,
};

export const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		postAdded: {
			reducer(state, action) {
				state.posts.push(action.payload);
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
			const existingPost = state.posts.find((post) => post.id === postId);
			if (existingPost) {
				existingPost.reactions[reaction]++;
			}
		},
	},
});

export const { postAdded, reactionAdded } = postsSlice.actions;

export const selectAllPosts = (state) => state.posts.posts;

const postsReducer = postsSlice.reducer;
export default postsReducer;
