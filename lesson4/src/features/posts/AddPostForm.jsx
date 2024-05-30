import { useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";

export default function AddPostForm() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [userId, setUserId] = useState("");
	const [addRequestStatus, setAddRequestStatus] = useState("idle");

	const navigate = useNavigate();

	const users = useSelector(selectAllUsers);

	const dispatch = useDispatch();

	const canSave =
		[title, content, useId].every(Boolean) && addRequestStatus === "idle";

	const handleSubmit = (e) => {
		e.preventDefault();

		if (canSave) {
			try {
				setAddRequestStatus("pending");
				dispatch(addNewPost({ title, body: content, userId })).unwrap();

				setTitle("");
				setContent("");
				setUserId("");

				navigate("/");
			} catch (error) {
				console.log("failed to save the post: ", error);
			} finally {
				setAddRequestStatus("idle");
			}
		}
	};

	return (
		<section>
			<h2>Add new Posts</h2>
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
					value={userId}
					onChange={(e) => setUserId(e.target.value)}
				>
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
					Save button
				</button>
			</form>
		</section>
	);
}
