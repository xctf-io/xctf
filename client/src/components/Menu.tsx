import React from "react";
import { toPng } from "html-to-image";
import { Button, ButtonGroup } from "@nextui-org/react";
import { HiDownload, HiOutlinePlus } from "react-icons/hi";

function downloadImage(dataUrl: string) {
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
		<ButtonGroup
			size="lg"
			className="absolute left-[35px] top-[85px] z-10 flex-col"
			variant="bordered"
		>
			<Button
				radius="none"
				onPress={openModal}
				endContent={<HiOutlinePlus />}
				style={{
					color: "black",
					backgroundColor: "white",
					height: "54px",
					borderColor: "#EEEEEE"
				}}
			>
				Add evidence
			</Button>
			<Button
				radius="none"
				onPress={onClick}
				endContent={<HiDownload />}
				style={{
					color: "black",
					backgroundColor: "white",
					height: "54px",
					borderColor: "#EEEEEE"
				}}
			>
				Download
			</Button>
		</ButtonGroup>
	);
};

export default Menu;
