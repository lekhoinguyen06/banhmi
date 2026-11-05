
# Preference

This is the Bánh Mì team preferences when developing and using Bánh Mì.

## Agent

Response:
- Simple, concise, with TDLR at the top
- Code snippet to visualize any code changes of necessary
  
## Usage

### Declaration

You need to create a file to declare your domains and views.
For example, you can create a file called `banhmi.ts` in your project root directory with the following content:

  

```typescript

  import { getBanhMi } from "banhmi";

  const domains = ["app", "app::post", "app::comment", "guide"] as const;
  type Domain = (typeof domains)[number];
  const views = ["$s", "$m", "$l"] as const;
  type View = (typeof views)[number];

  const banhmi = getBanhMi<Domain, View>({
    srcDir: import.meta.dir,
    outDir: "./docs",
  });

  export const { PAGE, TEXT, CODE, TABLE, FRONTMATTER, write } = banhmi;
  export default banhmi;
  
```



```typescript

import { PAGE, TEXT } from "./banhmi";

PAGE("app", { title: "My App" });

TEXT(`
# Welcome to My App

This is the documentation for My App.
`);
  
```


# 🍞 banh mi

"bánh mì" is a Vietnamese word that means "bread".

## Why

Like any breakthroughs, the abstraction level increases. In the AI revolution, implementation is abstracted. We believe the future is about orchestration, the communication of ideas.

However, the current context management practices using `SKILL.md` is not enough.
We feels there is the lack of:

- Domain management
- Context orchestration
- Parameterization

Therefore, we created "banh mi" to address these issues.
  