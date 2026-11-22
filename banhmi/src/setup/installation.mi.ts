import { CODE, TEXT } from "../../banhmi";

TEXT(
  `
# Installation
  `,
  {
    domain: "banhmi_setup_installation",
    views: ["all"],
  },
);

CODE(
  `
# NPM
npm install -D banhmi

# PNPM
pnpm add -D banhmi

# Yarn
yarn add -D banhmi

# Bun
bun add -D banhmi
  `,
  {
    domain: "banhmi_setup_installation",
    views: ["all"],
    language: "bash",
  },
);
