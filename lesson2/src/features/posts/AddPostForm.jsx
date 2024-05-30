import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";

export default function AddPostForm() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [userId, setUserId] = useState("");

	const users = useSelector(selectAllUsers);

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(postAdded(title, content, userId));
		setContent("");
		setTitle("");
	};

	const canSave = !!title && !!content && !!userId;

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
