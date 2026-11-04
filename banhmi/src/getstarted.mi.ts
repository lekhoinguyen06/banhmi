import { CODE, PAGE, TEXT } from "../banhmi";

PAGE("docs.getstarted", {});

TEXT(
  `
# Let's bake
  `,
  {
    domainRefs: ["docs.getstarted.installation", "docs.getstarted.usage"],
  },
);
