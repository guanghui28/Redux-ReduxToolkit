import { useAddReactionMutation } from "./postsSlice";

const reactionEmoji = {
	thumbsUp: "👍",
	wow: "😲",
	heart: "💖",
	rocket: "🚀",
	coffee: "☕",
};

export default function ReactionButtons({ post }) {
	const [reactionAdded] = useAddReactionMutation();

	const buttons = Object.entries(reactionEmoji).map(([name, emoji]) => (
		<button
			key={name}
			type="button"
			className="reactionButton"
			onClick={() => {
				const newValue = post.reactions[name] + 1;
				reactionAdded({
					postId: post.id,
					reactions: { ...post.reactions, [name]: newValue },
				});
			}}
		>
			{emoji} {post.reactions[name]}
		</button>
	));

	return <div>{buttons}</div>;
}
