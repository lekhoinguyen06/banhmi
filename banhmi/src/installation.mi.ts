import { CODE, PAGE, TEXT } from "../banhmi";

PAGE("docs.getstarted.installation", {});

TEXT(`
### Installation
  `);

CODE(
  `
# NPM
npm install banhmi

# PNPM
pnpm add banhmi

# Yarn
yarn add banhmi

# Bun
bun add banhmi
  `,
  { language: "bash" },
);
