import { PAGE, TEXT } from "../banhmi";

PAGE("docs_introduction", {});

TEXT(
  `
# 🍞 banh mi

"bánh mì" is a Vietnamese word that means "bread".

## Why

Like any breakthroughs, the abstraction level increases. In the AI revolution, implementation is abstracted. We believe the future is about orchestration, the communication of ideas.

However, the current context management practices using \`SKILL.md\` is not enough.
We feels there is the lack of:

- Domain management
- Context orchestration
- Parameterization

Therefore, we created "banh mi" to address these issues.
  `,
  { viewRefs: ["s"] },
);
