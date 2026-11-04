import { getBanhMi } from "../index";

const domains = [
  "docs_introduction",
  "docs_concepts",
  "docs_getstarted",
  "docs_getstarted_installation",
  "docs_getstarted_usage",
  "docs_examples",
  "dev_preference",
] as const;
type Domain = (typeof domains)[number];
const views = ["s", "m", "l"] as const;
type View = (typeof views)[number];

const banhmi = getBanhMi<Domain, View>({
  srcDir: import.meta.dir,
  outDir: "./banhmi/generated",
});

export const { PAGE, TEXT, CODE, TABLE, FRONTMATTER, write } = banhmi;
export default banhmi;
