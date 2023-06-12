# @team.poi/code_block

![Code Block]()

## Installation

### NPM

```bash
npm install @team.poi/code_block
```

### Yarn

```bash
yarn add @team.poi/code_block
```

## Usage

```tsx
import { CodeBlock } from "@team.poi/code_block";
export default function Home() {
  return (
    <CodeBlock
      code={
        '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n\tcout << "Hello, World!";\n}'
      }
      language="c++"
    />
  );
}
```
