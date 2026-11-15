# Document

## Banh Mi lock

This is the single source of truth for Banh Mi.

```banhmi.lock.json
{
  // Project information
  "project": {
    "name": "my-banhmi-project",
    "description": "A project for generating Banh Mi artifacts.",
  },
  "blocks": [
    {
      "type": "text", // For rendering content
      "content": "Text"
    },
    // ...
  ],
  "domains": [
    {
      "key": "app_domain_subdomain_event",
      "name": "App Domain Subdomain Event",
      "description": "This domain represents the app's domain, subdomain, and event.",
    }
    // ...
  ],
  "views": [
    "view",
    // ...
  ],
  "artifacts": {
    "files": [
      "filename.ts",
      // ...
    ]
  }
}
```

## Declare a Banh Mi instance

```banhmi.ts
import { bake } from "banhmi";

const domains = ["app", "app_post", "app_comment", "guide"] as const;
const views = ["s", "m", "l"] as const;

type Domain = (typeof domains)[number];
type View = (typeof views)[number];

const banhmi = bake<Domain, View>({
  srcDir: import.meta.dir,
  outDir: "./src/generated/banhmi",
});

export const { TEXT, CODE, TABLE } = banhmi;
export default banhmi;

banhmi.write();
```

## Write Banh Mi

```*.mi.ts
import { TEXT, CODE } from "./banhmi";

TEXT(`
# My App

This is my app
`, {
  domain: "app",
  views: ["s"],
})

CODE(`
import { TEXT } from "./banhmi";
`, {
  domain: "guide",
  views: ["s"],

  // Block options
  language: "ts",
})
```
