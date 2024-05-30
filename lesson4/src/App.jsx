import AddPostForm from "./features/posts/AddPostForm";
import PostsList from "./features/posts/PostsList";

export default function App() {
	return (
		<main className="main">
			<AddPostForm />
			<PostsList />
		</main>
	);
}
