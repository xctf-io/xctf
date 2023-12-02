import React, { useEffect, useState } from "react";
interface Props {}

const WelcomePage: React.FC<Props> = () => {
	return (
		<div className="text-center font-medium mx-[15vw] lg:mx-[25vw] mt-8 flex flex-col gap-4 relative">
			<span className="mb-0 text-5xl font-extrabold">Welcome to xctf!</span>
			<h4>Register/Login to get started.</h4>
		</div>
	);
};

export default WelcomePage;
