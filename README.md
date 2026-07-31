# Sponsor videos

Remotion project for Zurich JS Conf sponsor bumpers.

## Branches

- `main` contains the shared Remotion starter.
- `namespace` contains the Namespace sponsor bumper.
- `ag-grid` contains the AG Grid sponsor bumper.

## Commands

Install dependencies:

```sh
npm install
```

Open Remotion Studio:

```sh
npm run dev
```

Render the sponsor composition on the current branch:

```sh
npx remotion render src/index.ts <composition-id> out/video.mp4
```

Run checks:

```sh
npm run lint
```

Rendered videos are written to `out/` and are intentionally ignored by Git.
