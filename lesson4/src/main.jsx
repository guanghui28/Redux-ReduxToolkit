import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { postsApiSlice } from "./features/posts/postsSlice";
import { usersApiSlice } from "./features/users/usersSlice";

import { BrowserRouter } from "react-router-dom";

store.dispatch(postsApiSlice.endpoints.getPosts.initiate());
store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
