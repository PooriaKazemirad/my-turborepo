# `@workspace/eslint-config`

Typed ESLint flat configurations shared across the workspace.

- `@workspace/eslint-config/base`: JavaScript, TypeScript syntax, and Turbo rules.
- `@workspace/eslint-config/react-internal`: base rules plus React Hooks rules.
- `@workspace/eslint-config/next-js`: base, React Hooks, and Next.js rules.

Each export is a TypeScript module with an explicit `Linter.Config[]` type. Consumers use `eslint.config.ts` and install `jiti` to load these modules on the workspace's supported Node.js version. No compilation step is required.

Run `pnpm --filter @workspace/eslint-config typecheck` or `pnpm --filter @workspace/eslint-config lint` from the repository root. Both checks also run through the root workspace scripts; the pre-commit type check includes this package.
