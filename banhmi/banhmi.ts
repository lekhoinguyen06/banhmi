import { getBanhMi } from "../index";

const domains = [
  "docs.introduction",
  "docs.concepts",
  "docs.getstarted",
  "docs.getstarted.installation",
  "docs.getstarted.usage",
  "docs.examples",
  "dev.preference",
] as const;
type Domain = (typeof domains)[number];
const views = ["..s", "..m", "..l"] as const;
type View = (typeof views)[number];

const banhmi = getBanhMi<Domain, View>({
  srcDir: import.meta.dir,
  outDir: "./banhmi/generated",
});

export const { PAGE, TEXT, CODE, TABLE, FRONTMATTER, write } = banhmi;
export default banhmi;
