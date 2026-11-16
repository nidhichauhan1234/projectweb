import { describe, expect, it } from "vitest";
import { gallery, gifts, photos } from "../../config.js";

describe("birthday config", () => {
  it("lists exactly 12 photo slots, photo1.jpg to photo12.jpg in /photos", () => {
    expect(photos).toEqual(Array.from({ length: 12 }, (_, i) => `/photos/photo${i + 1}.jpg`));
  });

  it("only references photo numbers 1–12", () => {
    const used = [
      ...gallery.items.map((g) => g.photo),
      gifts.letter.photo,
      gifts.double.photo,
      ...gifts.craft.waterfallPhotos,
    ];
    used.forEach((n) => expect(n >= 1 && n <= 12).toBe(true));
  });

  it("has 5 gifts with a bubble and label each", () => {
    expect(gifts.bubbles).toHaveLength(5);
    expect(gifts.labels).toHaveLength(5);
  });

  it("waterfall card uses 3–4 photos", () => {
    expect(gifts.craft.waterfallPhotos.length).toBeGreaterThanOrEqual(3);
    expect(gifts.craft.waterfallPhotos.length).toBeLessThanOrEqual(4);
  });
});
