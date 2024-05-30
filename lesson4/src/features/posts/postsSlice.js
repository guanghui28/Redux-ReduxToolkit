import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
	posts: [],
	status: "idle",
	error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	try {
		const res = await axios.get(POST_URL);
		return [...res.data];
	} catch (error) {
		return error.message;
	}
});

export const addNewPost = createAsyncThunk(
	"posts/addNewPost",
	async (initialPost) => {
		try {
			console.log({ initialPost });
			const res = await axios.post(POST_URL, initialPost);
			console.log("after post: ", res);
			return res.data;
		} catch (error) {
			return error.message;
		}
	}
);

export const updatePost = createAsyncThunk(
	"posts/updatePost",
	async (initialPost) => {
		const { id } = initialPost;
		try {
			const res = await axios.put(`${POST_URL}/${id}`, initialPost);
			return res.data;
		} catch (error) {
			// return error.message;
			return initialPost; // only for testing Redux
		}
	}
);

export const deletePost = createAsyncThunk(
	"posts/deletePost",
	async (initialPost) => {
		const { id } = initialPost;
		try {
			const res = await axios.delete(`${POST_URL}/${id}`);
			if (res?.status === 200) return initialPost;
			return `${res?.status}: ${res?.statusText}`;
		} catch (error) {
			return error.message;
		}
	}
);

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
	extraReducers(builder) {
		builder
			.addCase(fetchPosts.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = "succeed";
				let min = 1;
				const loadedPosts = action.payload.map((post) => {
					post.date = sub(new Date(), { minutes: min++ }).toISOString();
					post.reactions = {
						thumbsUp: 0,
						wow: 0,
						heart: 0,
						rocket: 0,
						coffee: 0,
					};

					return post;
				});
				state.posts = [...loadedPosts];
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(addNewPost.fulfilled, (state, action) => {
				console.log("action.payload: ", action.payload);
				action.payload.userId = Number(action.payload.userId);
				action.payload.date = new Date().toISOString();
				action.payload.reactions = {
					thumbsUp: 0,
					wow: 0,
					heart: 0,
					rocket: 0,
					coffee: 0,
				};
				state.posts.push(action.payload);
			})
			.addCase(updatePost.fulfilled, (state, action) => {
				if (!action.payload?.id) {
					console.log("Something broke");
					return;
				}
				const { id } = action.payload;
				action.payload.date = new Date().toISOString();
				const posts = state.posts.filter((post) => post.id !== id);
				state.posts = [...posts, action.payload];
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				if (!action.payload?.id) {
					console.log("Something broke");
					return;
				}
				const { id } = action.payload;
				state.posts = state.posts.filter((post) => post.id !== id);
			});
	},
});

export const { postAdded, reactionAdded } = postsSlice.actions;

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const selectPostById = (state, postId) =>
	state.posts.posts.find((post) => post.id === postId);

const postsReducer = postsSlice.reducer;
export default postsReducer;
