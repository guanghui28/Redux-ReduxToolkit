import { useSelector, useDispatch } from "react-redux";
import { compareAsc } from "date-fns";
import { useEffect } from "react";

import {
	selectAllPosts,
	getPostsStatus,
	getPostsError,
	fetchPosts,
} from "./postsSlice";
import PostExcerpt from "./PostExcerpt";

export default function PostsList() {
	const posts = useSelector(selectAllPosts);
	const error = useSelector(getPostsError);
	const postsStatus = useSelector(getPostsStatus);

	const dispatch = useDispatch();

	useEffect(() => {
		if (postsStatus === "idle") {
			dispatch(fetchPosts());
		}
	}, [dispatch, postsStatus]);

	const orderedPosts = posts.slice().sort((a, b) => compareAsc(b.date, a.date));

	return (
		<section>
			<h2>Posts</h2>
			{orderedPosts.map((post) => (
				<PostExcerpt key={post.id} post={post} />
			))}
		</section>
	);
}
