// Typed bridge to the editable /config.js at the project root.
export * from "../../config.js";
import { photos } from "../../config.js";

/** Photo numbers in config.js are 1-based (1 = photo1.jpg). */
export function photoSrc(n: number): string | undefined {
  return photos[n - 1];
}
