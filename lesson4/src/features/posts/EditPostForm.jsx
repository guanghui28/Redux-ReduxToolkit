import { useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, selectPostById, updatePost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPostForm() {
	const { postId } = useParams();
	const navigate = useNavigate();

	const post = useSelector((state) => selectPostById(state, +postId));

	const [title, setTitle] = useState(post?.title);
	const [content, setContent] = useState(post?.body);
	const [userId, setUserId] = useState(post?.userId);
	const [requestStatus, setRequestStatus] = useState("idle");

	const users = useSelector(selectAllUsers);

	const dispatch = useDispatch();

	const canSave =
		[title, content, useId].every(Boolean) && requestStatus === "idle";

	const handleSubmit = (e) => {
		e.preventDefault();

		if (canSave) {
			try {
				setRequestStatus("pending");
				console.log("form: ", { userId });
				dispatch(
					updatePost({
						id: post.id,
						title,
						body: content,
						userId,
						reactions: post.reactions,
					})
				).unwrap();

				setTitle("");
				setContent("");
				setUserId("");

				navigate(`/post/${postId}`);
			} catch (error) {
				console.log("failed to save the post: ", error);
			} finally {
				setRequestStatus("idle");
			}
		}
	};

	const handleDeletePost = () => {
		if (!confirm("Are you sure to delete this post?")) {
			return;
		}
		try {
			setRequestStatus("pending");
			dispatch(
				deletePost({
					id: post.id,
					title,
					body: content,
					userId,
					reactions: post.reactions,
				})
			).unwrap();

			setTitle("");
			setContent("");
			setUserId("");

			navigate("/");
		} catch (error) {
			console.log("failed to delete the post: ", error);
		} finally {
			setRequestStatus("idle");
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
					onChange={(e) => setTitle(e.target.value)}
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
