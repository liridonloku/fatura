import generateInputDate from './generateInputDate';

describe('Generates dates correctly', () => {
  it('Works with 2022-01-01', () => {
    const date = new Date(2022, 1, 1);
    expect(generateInputDate(date)).toBe(`2022-01-01`);
  });
});
