import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";

const reactionEmoji = {
	thumbsUp: "👍",
	wow: "😲",
	heart: "💖",
	rocket: "🚀",
	coffee: "☕",
};

export default function ReactionButtons({ post }) {
	const dispatch = useDispatch();

	console.log(Object.entries(reactionEmoji));
	const buttons = Object.entries(reactionEmoji).map(([name, emoji]) => (
		<button
			key={name}
			type="button"
			className="reactionButton"
			onClick={() =>
				dispatch(reactionAdded({ postId: post.id, reaction: name }))
			}
		>
			{emoji} {post.reactions[name]}
		</button>
	));

	return <div>{buttons}</div>;
}
