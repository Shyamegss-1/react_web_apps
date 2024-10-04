import React from "react";

interface textprops {
	fs?: Number;
	style?: React.CSSProperties;
	variant?: "div" | "p";
	children: React.ReactNode;
}

export default function Text({ fs, style, children, variant }: textprops) {
	const CC = variant || "div";

	return (
		<CC style={fs ? { fontSize: `${fs}px`, ...style } : { ...style }}>
			{children}
		</CC>
	);
}
