import { useSelector, useDispatch } from "react-redux";
import { compareAsc } from "date-fns";
import { useEffect } from "react";

import {
	selectAllPosts,
	fetchPosts,
	getPostsError,
	getPostsStatus,
} from "./postsSlice";
import PostExcerpt from "./PostExcerpt";

export default function PostsList() {
	const posts = useSelector(selectAllPosts);
	const postsStatus = useSelector(getPostsStatus);
	const error = useSelector(getPostsError);
	const dispatch = useDispatch();

	useEffect(() => {
		if (postsStatus === "idle") {
			dispatch(fetchPosts());
		}
	}, [dispatch, postsStatus]);

	let content;
	if (postsStatus === "loading") {
		content = <p>Loading...</p>;
	} else if (postsStatus === "succeed") {
		const orderedPosts = posts
			.slice()
			.sort((a, b) => compareAsc(b.date, a.date));

		content = orderedPosts.map((post, index) => (
			<PostExcerpt key={post.id || index} post={post} />
		));
	} else if (postsStatus === "failed") {
		content = <p>{error}</p>;
	}

	return (
		<section>
			<h2>Posts</h2>
			{content}
		</section>
	);
}
