import generated from "./generated/data.json";

export type Prop = {
  name: string;
  type: string;
  required: boolean;
  defaultValue: string | null;
  description: string;
};

type Data = {
  name: string;
  version: string;
  changelog: string;
  guidelines: Record<string, { summary: string; html: string }>;
  props: Record<string, Prop[]>;
  sources: Record<string, Record<string, string>>;
};

/** Written by scripts/generate.ts before every dev server start and build. */
export const data = generated as Data;

export const REPO = "https://github.com/franco-roura/module-01";
export const NPM = "https://www.npmjs.com/package/@franco_roura/module-01";
