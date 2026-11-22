import { CODE, TEXT } from "../../banhmi";

TEXT(
  `
#  Eat

To generate \`banhmi\` lock file and other assets, eat your \`banhmi\`!
  `,
  {
    domain: "banhmi_setup_write",
    views: ["all"],
  },
);

CODE(
  `
bun run <your-banhmi>
`,
  {
    domain: "banhmi_setup_write",
    views: ["all"],
    language: "bash",
  },
);
