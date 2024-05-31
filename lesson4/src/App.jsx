import AddPostForm from "./features/posts/AddPostForm";
import PostsList from "./features/posts/PostsList";
import SinglePost from "./features/posts/SinglePost";
import Layout from "./components/Layout";
import EditPostForm from "./features/posts/EditPostForm";
import { Route, Routes, Navigate } from "react-router-dom";
import UserPage from "./features/users/UserPage";
import UsersList from "./features/users/UsersList";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<PostsList />} />

				<Route path="post">
					<Route index element={<AddPostForm />} />
					<Route path=":postId" element={<SinglePost />} />
					<Route path="edit/:postId" element={<EditPostForm />} />
				</Route>

				<Route path="user">
					<Route index element={<UsersList />} />
					<Route path=":userId" element={<UserPage />} />
				</Route>

				<Route path="*" element={<Navigate to="/" replace />} />
			</Route>
		</Routes>
	);
}
