import { CODE, PAGE, TEXT } from "../banhmi";

PAGE("docs::getstarted", {});

TEXT(`
# Let's bake

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

TEXT(`
## Usage

You need to create a file to declare your domains and views.
For example, you can create a file called \`banhmi.ts\` in your project root directory with the following content:

  `);

CODE(
  `
  import { getBanhMi } from "banhmi";

  const domains = [
    "app",
    "app::post",
    "app::comment",
    "guide",
  ] as const;
  type Domain = (typeof domains)[number];
  const views = ["s", "m", "l"] as const;
  type View = (typeof views)[number];

  const banhmi = getBanhMi<Domain, View>({
    srcDir: import.meta.dir,
    outDir: "./docs",
  });

  export const { PAGE, TEXT, CODE, TABLE, FRONTMATTER, write } = banhmi;
  export default banhmi;
  `,
  { language: "typescript" },
);

TEXT(`
Then, you can use the blocks to start writing in any \`*.mi.ts\` file in your project.
Remember to use the \`PAGE\` block at the top of your file to declare the domain and metadata for the page.
You can use \`TEXT\`, \`CODE\`, \`TABLE\`, and \`FRONTMATTER\` blocks to add content to the page.
  `);

CODE(
  `
import { PAGE, TEXT } from "./banhmi";

PAGE("app", { title: "My App" });

TEXT(\`
# Welcome to My App

This is the documentation for My App.
\`);
  `,
  { language: "typescript" },
);
