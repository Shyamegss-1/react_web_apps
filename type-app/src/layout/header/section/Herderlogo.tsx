import React from "react";
import { Box } from "@mui/material";
import { SxProps } from "@mui/system";
import { Link } from "react-router-dom";

type LogoProps = {
	Path: string;
	width?: number;
	sx?: SxProps;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export default function LogoConver({
	Path,
	width,
	height,
	sx,
	...props
}: LogoProps) {
	const px = function (value: number) {
		let convr = value * 4;
		return `${convr}px`;
	};

	return (
		<Box width={px(width || 3)} sx={{ ...sx }}>
			<Link to={"/"}>
				<img src={Path} alt='' {...props} />
			</Link>
		</Box>
	);
}
