import { useId, useState } from "react";
import { useSelector } from "react-redux";
import {
	useUpdatePostMutation,
	selectPostById,
	useDeletePostMutation,
} from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPostForm() {
	const { postId } = useParams();
	const post = useSelector((state) => selectPostById(state, +postId));
	const [title, setTitle] = useState(post?.title);
	const [content, setContent] = useState(post?.body);
	const [userId, setUserId] = useState(post?.userId);
	const navigate = useNavigate();

	const users = useSelector(selectAllUsers);
	const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
	const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

	const canSave =
		[title, content, useId].every(Boolean) && !isDeleting && !isUpdating;

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (canSave) {
			try {
				await updatePost({
					title,
					body: content,
					id: post.id,
					userId: Number(userId),
					reactions: post.reactions,
				}).unwrap();

				setTitle("");
				setContent("");
				setUserId("");

				navigate(`/post/${postId}`);
			} catch (error) {
				console.log("failed to save the post: ", error);
			}
		}
	};

	const handleDeletePost = async () => {
		if (!confirm("Are you sure to delete this post?")) {
			return;
		}
		try {
			await deletePost({ id: postId }).unwrap();

			setTitle("");
			setContent("");
			setUserId("");
			navigate("/");
		} catch (error) {
			console.log("failed to delete the post: ", error);
		}
	};

	if (!post) {
		return (
			<section>
				<h2>Post not found!</h2>
			</section>
		);
	}

	return (
		<section>
			<h2>Edit Post</h2>
			<button onClick={handleDeletePost} disabled={!canSave}>
				Delete Post
			</button>
			<form onSubmit={handleSubmit}>
				<label htmlFor="postTitle">Post Title: </label>
				<input
					type="text"
					id="postTitle"
					name="postTitle"
					value={title}
					onChange={(e) => setTitle(Number(e.target.value))}
				/>
				<label htmlFor="postAuthor">Author: </label>
				<select
					id="postAuthor"
					defaultValue={userId}
					onChange={(e) => setUserId(e.target.value)}
				>
					<option value="">Select author</option>
					{users.map((user) => (
						<option key={user.id} value={user.id}>
							{user.name}
						</option>
					))}
				</select>
				<label htmlFor="postContent">Post Content: </label>
				<textarea
					id="postContent"
					name="postContent"
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
				<button disabled={!canSave} type="submit">
					Save edit
				</button>
			</form>
		</section>
	);
}
