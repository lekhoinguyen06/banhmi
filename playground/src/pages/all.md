---
key: all
---

# 🍞 bánh mì

"bánh mì" is a Vietnamese word that means "bread".
  

# Why

We were building [Walker](https://github.com/lekhoinguyen06/walker) when we realized there are still a lot of short-comes in context management.

For Walker, we need:

- 1-shot context. How do we get all the information needed so that inference runs once?
- Parameter. How does Walker builders orchestrate their context? For instance, larger models can have larger context, how do we orchestrate what matters, or what relavants?
- Static. How does Walker builders has typed context query capability?
  

# Installation
  
```bash

# NPM
npm install -D banhmi

# PNPM
pnpm add -D banhmi

# Yarn
yarn add -D banhmi

# Bun
bun add -D banhmi
  
```

# Bake

To create a `banhmi` instance, bake it!
  
```ts

import { bake } from "../src";
import { TSPlugin } from "../src/ts.plugin";

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
  plugins: [TSPlugin],
});

export const { TEXT, CODE } = banhmi;
banhmi.write();
  
```

#  Eat

To generate `banhmi` lock file and other assets, eat your `banhmi`!
  
```bash

bun run <your-banhmi>

```

# Domain

As key representing our context domains.
  

# Block

A singular unit of context.
  

# View

Each block can be tagged to many views to aggregate context in a selected manners.
  