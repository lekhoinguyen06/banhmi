import { bake } from "../src";

const domains = [
  "banhmi",
  "banhmi_why",
  "banhmi_concept",
  "banhmi_concept_domain",
  "banhmi_concept_view",
  "banhmi_concept_block",
  "banhmi_setup",
  "banhmi_setup_installation",
  "banhmi_setup_instance",
  "banhmi_setup_write",
] as const;
type Domain = (typeof domains)[number];
const views = ["all"] as const;
type View = (typeof views)[number];

const banhmi = bake<Domain, View>({
  srcDir: "./banhmi",
  outDir: "./banhmi/generated",
  domains,
  views,
  plugins: [],
});

export const { TEXT, CODE } = banhmi;
banhmi.write();
