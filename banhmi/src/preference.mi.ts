import { PAGE, TEXT } from "../banhmi";

PAGE("dev_preference", {});

TEXT(
  `
# Preference

This is the Bánh Mì team preferences when developing and using Bánh Mì.

## Agent

Response:
- Simple, concise, with TDLR at the top
- Code snippet to visualize any code changes of necessary
  `,
  { viewRefs: ["s"] },
);
