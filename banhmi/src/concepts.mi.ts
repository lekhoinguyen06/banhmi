import { PAGE, TEXT } from "../banhmi";

PAGE("docs_concepts", {});

TEXT(`
## Concepts

Your Bánh Mì codebase will be generated into files with names that match Bánh Mì's query patterns.

Bánh Mì for now has 2 main concepts:

### Domain

Domain is a group of blocks that encapsulate an idea.

### View

However, tree structure is not enough to represent complex ideas relationships.
Views allow you to tag each block and the compiler will aggregate these block into a page for each view.
An example of this would be small, medium, and large context shortcuts; just like llm-small.txt or llm.txt.
  `);
