import { useSelector } from "react-redux";

import { selectPostIds, useGetPostsQuery } from "./postsSlice";
import PostExcerpt from "./PostExcerpt";

export default function PostsList() {
	const orderedPostIds = useSelector(selectPostIds);
	const { isLoading, isSuccess, isError, error } = useGetPostsQuery();

	let content;
	if (isLoading) {
		content = <p>Loading...</p>;
	} else if (isSuccess) {
		content = orderedPostIds.map((postId) => (
			<PostExcerpt key={postId} postId={postId} />
		));
	} else if (isError) {
		content = <p>{error}</p>;
	}

	return <section>{content}</section>;
}
