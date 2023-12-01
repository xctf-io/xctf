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
		toPng(document.querySelector(".react-flow") as HTMLElement, {
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
			className="absolute left-[41px] top-[79px] z-10 flex-col items-end"
			variant="bordered"
		>
			<Button
				radius="none"
				onPress={openModal}
				endContent={<HiOutlinePlus />}
				className="text-black bg-white w-full h-[54px]"
				style={{
					borderColor: "#EEEEEE"
				}}
			>
				Add evidence
			</Button>
			<Button
				radius="none"
				onPress={onClick}
				endContent={<HiDownload />}
				className="text-black bg-white h-[54px] w-full border-t-0"
				style={{
					borderColor: "#EEEEEE"
				}}
			>
				Download
			</Button>
		</ButtonGroup>
	);
};

export default Menu;
