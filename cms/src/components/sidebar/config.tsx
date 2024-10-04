import SvgColor from "../svg-color/svgColor";
import { header1, header2, header3 } from "../../layouts/layout-demo/header";
import { doubleFrame } from "../../layouts/layout-demo/layout";

const icon = (name: string) => (
  <SvgColor src={name} sx={{ width: 1, height: 1 }} />
);

interface dataType {
  title: string;
  icon?: string | number | {};
  class: string;
  properties: any;
}

interface objType {
  title: string;
  icon: string | number | {};
  class: string;
  types: dataType[];
}

const config: objType[] = [
  {
    title: "Header",
    icon: icon(`/svg/button.svg`),
    class: "pikchu",
    types: [
      { title: "header-1", class: "bakmon", properties: header1 },
      { title: "header-2", class: "bakmon", properties: header2 },
      { title: "header-3", class: "bakmon", properties: header3 },
    ],
  },
  {
    title: "Layout",
    icon: icon(`/svg/layout.svg`),
    class: "pikchu",
    types: [
      { title: "layout-1", class: "bakmon", properties: doubleFrame },
      { title: "layout-2", class: "bakmon", properties: doubleFrame },
      { title: "layout-3", class: "bakmon", properties: doubleFrame },
    ],
  },
];

export default config;
