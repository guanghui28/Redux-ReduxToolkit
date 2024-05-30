import { Link } from "react-router-dom";

export default function Header() {
	return (
		<header className="Header">
			<h1>Redux blog</h1>
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/post">Post</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}