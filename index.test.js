import sum from "./index.js";

it("adds two numbers", () => {
  expect(sum(2, 2)).toBe(4);
});

it("adds three numbers", () => {
  expect(sum(2, 2, 3)).toBe(7);
});

it("adds four numbers", () => {
  expect(sum(2, 2, 3, 10)).toBe(17);
});
