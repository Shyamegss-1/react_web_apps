// utils
import "../../utils/highlight";
import ReactMarkdown from "react-markdown";
// markdown plugins
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
// @mui
import Link from "@mui/material/Link";
// routes
//
import Image from "../image/Image";
//
import StyledMarkdown from "./style";

// ----------------------------------------------------------------------

export default function Markdown({ sx, ...other }) {
  return (
    <StyledMarkdown sx={sx}>
      <ReactMarkdown
        rehypePlugins={[
          rehypeRaw,
          rehypeHighlight,
          [remarkGfm, { singleTilde: false }],
        ]}
        components={components}
        {...other}
      />
    </StyledMarkdown>
  );
}

// ----------------------------------------------------------------------

const components = {
  img: ({ ...props }) => (
    <Image alt={props.alt} ratio="16/9" sx={{ borderRadius: 2 }} {...props} />
  ),
  a: ({ ...props }) => {
    const isHttp = props.href.includes("http");

    return isHttp ? (
      <Link target="_blank" rel="noopener" {...props} />
    ) : (
      <Link href={props.href} {...props}>
        {props.children}
      </Link>
    );
  },
};
