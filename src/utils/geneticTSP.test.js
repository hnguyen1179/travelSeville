import functions from "./geneticTSP";

test('Shuffle [0, 1, 2, 3] to some random array', () => {
  expect(functions.shuffle([1, 2, 3, 4])).not.toBe([1, 2, 3, 4])
})