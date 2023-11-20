import React from "react";
import { toPng } from "html-to-image";
import { Button } from "@nextui-org/react";
import { HiDownload, HiOutlinePlus } from "react-icons/hi";

function downloadImage(dataUrl) {
	const a = document.createElement("a");

	a.setAttribute("download", "evidence_graph.png");
	a.setAttribute("href", dataUrl);
	a.click();
}

interface Props {
	openModal: () => void;
}

const Menu: React.FC<Props> = ({ openModal }) => {
	const onClick = () => {
		toPng(document.querySelector(".react-flow"), {
			filter: (node) => {
				if (
					node?.classList?.contains("react-flow__minimap") ||
					node?.classList?.contains("react-flow__controls")
				) {
					return false;
				}

				return true;
			},
		}).then(downloadImage);
	};

	return (
		<Button.Group
			size="lg"
			className="absolute left-[35px] top-[85px] z-10"
			vertical
			bordered
		>
			<Button
				onPress={openModal}
				iconRight={<HiOutlinePlus />}
				style={{
					color: "black",
					backgroundColor: "white",
					borderTopRightRadius: 0,
					borderTopLeftRadius: 0,
					height: "54px",
					borderColor: "#EEEEEE"
				}}
			>
				Add evidence
			</Button>
			<Button
				onPress={onClick}
				iconRight={<HiDownload />}
				style={{
					color: "black",
					backgroundColor: "white",
					borderBottomRightRadius: 0,
					borderBottomLeftRadius: 0,
					height: "54px",
					borderColor: "#EEEEEE"
				}}
			>
				Download
			</Button>
		</Button.Group>
	);
};

export default Menu;
