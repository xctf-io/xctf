import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarItem } from "@nextui-org/react";
import { useUser } from "../store/user";
import { useNavigate } from "react-router-dom";

const UserDropdown = () => {
    const [user, setUser, logout] = useUser();
    const navigate = useNavigate();
    const isAdmin = user?.type === "admin";
    const themeHexColor = isAdmin ? "DF3562" : "3070ED";
	const themeColor = isAdmin ? "danger" : "primary";
    return (
        <NavbarItem>
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Avatar
                        isBordered
                        as="button"
                        color={themeColor}
                        size="md"
                        src={
                            "https://api.dicebear.com/6.x/bottts/svg?baseColor=" +
                            themeHexColor +
                            "&seed=" +
                            user?.username
                        }
                    />
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="User menu actions"
                    onAction={(actionKey) => {
                        if (actionKey === "logout") {
                            logout();
                            document.location.href = "/login";
                            navigate("/login");
                        }
                    }}
                    className="border-0" 
                >
                    <DropdownItem
                        key="profile"
                        className="h-auto"
                        showDivider
                    >
                        <p >Signed in as</p>
                        <p
                            className="font-bold"
                            style={{
                                overflowWrap: "anywhere",
                            }}
                        >
                            {user?.username}
                        </p>
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger">
                        Logout
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </NavbarItem>
    );
}

export default UserDropdown;