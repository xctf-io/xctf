import { useUser } from "../store/user";
import { useNavigate } from "react-router-dom";

const UserDropdown = () => {
	const [user, setUser, logout] = useUser();
	const navigate = useNavigate();
	const isAdmin = user?.type === "admin";
	const themeHexColor = isAdmin ? "FE6667" : "767FFE";
	const themeColor = isAdmin ? "error" : "primary";
	return (
		<div className="dropdown dropdown-end">
			<div
				tabIndex={0}
				role="button"
				className={
					`avatar btn btn-outline btn-circle hover:bg-transparent border-${themeColor} hover:border-${themeColor}`
				}
			>
				<div className="w-10 rounded-full">
					<img
						src={
							"https://api.dicebear.com/6.x/bottts/svg?baseColor=" +
							themeHexColor +
							"&seed=" +
							user?.username
						}
					/>
				</div>
			</div>
			<ul
				tabIndex={0}
				className="mt-3 z-[1] px-3 py-5 shadow menu dropdown-content bg-base-200 rounded-box w-64 text-lg"
				aria-label="User menu actions"
			>
				<li>
					<p>Signed in as <span className="font-bold -ml-1">{user?.username}</span></p>
				</li>
				<li>
					<a
						className="link link-error"
						onClick={(actionKey) => {
							logout();
							document.location.href = "/login";
							navigate("/login");
						}}
					>
						Logout
					</a>
				</li>
			</ul>
		</div>
	);
};

export default UserDropdown;
