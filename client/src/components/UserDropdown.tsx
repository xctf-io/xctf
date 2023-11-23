import { Avatar, Dropdown, Navbar, Text } from "@nextui-org/react";
import { useUser } from "../store/user";
import { useNavigate } from "react-router-dom";

const UserDropdown = () => {
    const [user, setUser, logout] = useUser();
    const navigate = useNavigate();
    const isAdmin = user?.type === "admin";
    const themeHexColor = isAdmin ? "DF3562" : "3070ED";
	const themeColor = isAdmin ? "error" : "primary";
    return (
        <Navbar.Item>
            <Dropdown placement="bottom-right">
                <Dropdown.Trigger>
                    <Avatar
                        bordered
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
                </Dropdown.Trigger>
                <Dropdown.Menu
                    aria-label="User menu actions"
                    onAction={(actionKey) => {
                        if (actionKey === "logout") {
                            logout();
                            document.location.href = "/login";
                            navigate("/login");
                        }
                    }}
                    containerCss={{ border: "none" }}
                >
                    <Dropdown.Item
                        key="profile"
                        css={{
                            height: "auto",
                            paddingTop: "0.5rem",
                            paddingBottom: "0.5rem",
                        }}
                    >
                        <Text color="inherit">Signed in as</Text>
                        <Text
                            b
                            color="inherit"
                            style={{
                                overflowWrap: "anywhere",
                            }}
                        >
                            {user?.username}
                        </Text>
                    </Dropdown.Item>
                    <Dropdown.Item key="logout" withDivider color="error">
                        Logout
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Navbar.Item>
    );
}

export default UserDropdown;