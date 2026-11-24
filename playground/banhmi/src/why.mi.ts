import { TEXT } from "../banhmi";

TEXT(
  `
# Why

We were building [Walker](https://github.com/lekhoinguyen06/walker) when we realized there are still a lot of short-comes in context management.

For Walker, we need:

- 1-shot context. How do we get all the information needed so that inference runs once?
- Parameter. How does Walker builders orchestrate their context? For instance, larger models can have larger context, how do we orchestrate what matters, or what relavants?
- Static. How does Walker builders has typed context query capability?
  `,
  {
    domain: "banhmi_why",
    views: ["all"],
  },
);
