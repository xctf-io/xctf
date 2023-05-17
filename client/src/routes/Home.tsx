import React from "react";
import { Button, Link, useTheme } from "@nextui-org/react";
import Home from "./Home.mdx";

interface Props {}

const CTFComponent: React.FC<Props> = () => {
  const { type, isDark } = useTheme();
  const lineClass = isDark ? "h-1 bg-gray-400 opacity-75": "h-1 bg-slate";
	return (
		<div className="text-center font-medium mx-[15vw] lg:mx-[25vw] mt-8 flex flex-col gap-4">
			<div>
				<h1 className="mb-0">Welcome to CTFg!</h1>
				<h4>Register/Login to get started.</h4>
			</div>
      <hr className={lineClass} />
			<div >
				<Home
					components={{
						a: ({ children, ...props }) => <Link {...props}>{children}</Link>,
						p: ({ children, ...props }) => (
							<p className="text-lg" {...props}>
								{children}
							</p>
						),
            Break: () => <br />,
            strong: ({ children, ...props }) => <span className="font-extrabold" {...props}>{children}</span>,
					}}
				/>
      </div>
      <hr className={lineClass} />
			<p className="text-lg">
				For help related to the competition, go to the wiki. It will help you a
				lot.
			</p>
			<Button
				size="lg"
				onPress={() => (document.location = "https://wiki.ctfg.io")}
			>
				wiki
			</Button>
		</div>
	);
};

export default CTFComponent;
