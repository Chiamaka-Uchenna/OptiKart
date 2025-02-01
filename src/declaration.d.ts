
// src/declaration.d.ts
declare module "*.svg" {
  const content: string; // Treating SVG imports as a string (the path to the SVG file).
  export default content;
}
