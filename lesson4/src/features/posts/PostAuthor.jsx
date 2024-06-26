import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { Link } from "react-router-dom";

export default function PostAuthor({ userId }) {
	const users = useSelector(selectAllUsers);
	const author = users.find((user) => Number(user.id) == userId);

	return (
		<span>
			by{" "}
			{author ? (
				<Link to={`/user/${userId}`}>{author.name}</Link>
			) : (
				"Unknown author"
			)}
		</span>
	);
}
