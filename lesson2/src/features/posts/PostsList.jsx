import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import { compareAsc } from "date-fns";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

export default function PostsList() {
	const posts = useSelector(selectAllPosts);

	const orderedPosts = posts.slice().sort((a, b) => compareAsc(b.date, a.date));

	return (
		<section>
			<h2>Posts</h2>
			{orderedPosts.map((post) => (
				<article key={post.id}>
					<h3>{post.title}</h3>
					<p>{post.content.slice(0, 100)}</p>
					<p className="postCredit">
						<PostAuthor userId={post.userId} />
						<TimeAgo timestamp={post.date} />
					</p>
					<ReactionButtons post={post} />
				</article>
			))}
		</section>
	);
}
