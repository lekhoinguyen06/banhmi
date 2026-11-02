import { getBanhMi } from "../index";

const domains = [
  "docs::introduction",
  "docs::concepts",
  "docs::preference",
  "docs::getstarted",
  "docs::getstarted::installation",
  "docs::getstarted::usage",
  "docs::examples",
] as const;
type Domain = (typeof domains)[number];
const views = ["$s", "$m", "$l"] as const;
type View = (typeof views)[number];

const banhmi = getBanhMi<Domain, View>({
  srcDir: import.meta.dir,
  outDir: "./docs",
});

export const { PAGE, TEXT, CODE, TABLE, FRONTMATTER, write } = banhmi;
export default banhmi;
