import { useSelector } from "react-redux";
import { compareAsc } from "date-fns";

import { selectAllPosts, getPostsError, getPostsStatus } from "./postsSlice";
import PostExcerpt from "./PostExcerpt";

export default function PostsList() {
	const posts = useSelector(selectAllPosts);
	const postsStatus = useSelector(getPostsStatus);
	const error = useSelector(getPostsError);

	let content;
	if (postsStatus === "loading") {
		content = <p>Loading...</p>;
	} else if (postsStatus === "succeed") {
		const orderedPosts = posts
			.slice()
			.sort((a, b) => compareAsc(b.date, a.date));

		content = orderedPosts.map((post) => (
			<PostExcerpt key={post.id} post={post} />
		));
	} else if (postsStatus === "failed") {
		content = <p>{error}</p>;
	}

	return <section>{content}</section>;
}
