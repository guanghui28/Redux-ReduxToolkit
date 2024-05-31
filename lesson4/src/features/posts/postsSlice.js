import {
	createSlice,
	createAsyncThunk,
	createSelector,
	createEntityAdapter,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

const postsAdapter = createEntityAdapter({
	sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
	status: "idle",
	error: null,
	count: 0,
});

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
		reactionAdded(state, action) {
			const { postId, reaction } = action.payload;
			const existingPost = state.entities[postId];
			if (existingPost) {
				existingPost.reactions[reaction]++;
			}
		},
		incrementCount(state) {
			state.count += 1;
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
				postsAdapter.upsertMany(state, loadedPosts);
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(addNewPost.fulfilled, (state, action) => {
				action.payload.userId = Number(action.payload.userId);
				action.payload.date = new Date().toISOString();
				action.payload.reactions = {
					thumbsUp: 0,
					wow: 0,
					heart: 0,
					rocket: 0,
					coffee: 0,
				};
				postsAdapter.addOne(state, action.payload);
			})
			.addCase(updatePost.fulfilled, (state, action) => {
				if (!action.payload?.id) {
					console.log("Something broke");
					return;
				}
				action.payload.date = new Date().toISOString();
				postsAdapter.upsertOne(state, action.payload);
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				if (!action.payload?.id) {
					console.log("Something broke");
					return;
				}
				const { id } = action.payload;
				postsAdapter.removeOne(state, id);
			});
	},
});

export const { incrementCount, reactionAdded } = postsSlice.actions;

export const {
	selectAll: selectAllPosts,
	selectById: selectPostById,
	selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts);

export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const getCount = (state) => state.posts.count;

export const selectPostsByUser = createSelector(
	[selectAllPosts, (state, userId) => userId],
	(posts, userId) => posts.filter((post) => post.userId === userId)
);

const postsReducer = postsSlice.reducer;
export default postsReducer;
