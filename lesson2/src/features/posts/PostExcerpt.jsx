import TimeAgo from "./TimeAgo";
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";

export default function PostExcerpt({ post }) {
	return (
		<article>
			<h3>{post.title}</h3>
			<p>{post.content.slice(0, 100)}</p>
			<p className="postCredit">
				<PostAuthor userId={post.userId} />
				<TimeAgo timestamp={post.date} />
			</p>
			<ReactionButtons post={post} />
		</article>
	);
}
