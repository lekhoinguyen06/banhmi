# 🍞 Bánh Mì

"Bánh Mì" is a Vietnamese word that means "bread".

## Why

We were building [Walker](https://github.com/lekhoinguyen06/walker) when we realized there are still a lot of short-comes in context management.

For Walker, we need:

- 1-shot context. How do we get all the information needed so that inference runs once?
- Parameter. How does Walker builders orchestrate their context? For instance, larger models can have larger context, how do we orchestrate what matters, or what relavants?
- Static. How does Walker builders has typed context query capability?

## How

### Concepts

- Block: a singular unit of context.
- Domain: a key representing our context domains.
- View: each block can be tagged to many views to aggregate context in a selected manners

## Usage

### Installation

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

### Bake

```/banhmi/banhmi.ts
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

```bash
bun run banhmi/banhmi.ts
```

### Example

```/banhmi/src/index.mi.ts
import { TEXT } from "../banhmi";

TEXT(
  `
banhmi
  `,
  {
    domain: "banhmi",
    views: ["all"],
  },
);
```

## Roadmap

The idea is generally similar to OpenAPI Specification. This is the future we are looking towards:

- Source of truth
  - CaC (Context as Code)
  - Editor
  - Bánh Mì-Compatible context source
- Generators
  - Languages
  - Markdowns
- Package manager
  - Add
  - Remove
  - Install
- CLI
  - Init
  - Sync
  - Live
- Standard library (at Bánh Mì wiki): to conver the most standard context units in many fields.
- Bánh Mì language

So far, we have only implement CaC with generator plugin for Typescript.
