# 🍞 banhmi

"bánh mì" is a Vietnamese word that means "bread".

## Why

Like any breakthroughs, the abstraction level increases. For AI, implementation is abstracted, and we believe the future is about orchestration, the communication of ideas.

However, the current context management practices using 'SKILL.md' is not enough.
We feels there is the lack of:
- Domain management
- Type safety
- Parameterization

Therefore, we created a new abstraction layer called "banh mi" to address these issues.

## How

Your Bánh Mì codebase will be generated into files with names that match Bánh Mì's query patterns.

Bánh Mì for now has 2 main concepts:

### Domain

Domain is a group of blocks that encapsulate an idea. This can be anything. A PAGE is a domain.

### View

However, tree structure is not enough to represent complex ideas relationships. Views allow you to tag each block and the compiler will generate a view page for each tag. An example usage of this would be small, medium, and large context shortcuts; just like llm-small.txt or llm.txt.

The convention is:
- `::` is the domain separator
- `$` are views pages

### Demo

#### Zed

![Zed Editor](assets/zed-editor.png)

We used `b::` prefix. As you can see, the file names are the Bánh Mì query patterns. A `b::docs::$s` is a view page for the `docs` domain with the `s` tag.
