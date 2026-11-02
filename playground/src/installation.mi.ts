import { CODE, PAGE, TEXT } from "../banhmi";

PAGE("docs::getstarted::installation", {});

TEXT(`
## Installation

Make sure you have Node or any JavaScript runtime installed.
  `);

CODE(
  `
npm install -D banhmi

pnpm add -D banhmi

bun add -D banhmi

yarn add -D banhmi
  `,
  { language: "bash" },
);
