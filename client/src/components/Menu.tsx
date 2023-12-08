import React from "react";
import { toPng } from "html-to-image";
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
	const downloadGraph = () => {
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
		<div
			className="join join-vertical rounded-none absolute left-[41px] top-[101px] z-10"
		>
			<button
				onClick={openModal}
				className="btn text-black bg-white border-2 border-[#EEEEEE] w-full h-[55px] rounded-none"
			>
				Add evidence
				<HiOutlinePlus />
			</button>
			<button
				onClick={downloadGraph}
				className="btn text-black bg-white border-2 border-[#EEEEEE] border-t-0 w-full h-[54px] rounded-none"
			>
				Download
				<HiDownload />
			</button>
		</div>
	);
};

export default Menu;
