import generateInputDate from './generateInputDate';

describe('Generates dates correctly', () => {
  it('Works with 2022-01-01', () => {
    const date = new Date(2022, 0, 1);
    expect(generateInputDate(date)).toBe(`2022-01-01`);
  });

  it('Works with 2022-01-15', () => {
    const date = new Date(2022, 0, 15);
    expect(generateInputDate(date)).toBe(`2022-01-15`);
  });

  it('Works with 2022-10-05', () => {
    const date = new Date(2022, 9, 5);
    expect(generateInputDate(date)).toBe(`2022-10-05`);
  });

  it('Works with 2022-11-23', () => {
    const date = new Date(2022, 10, 23);
    expect(generateInputDate(date)).toBe(`2022-11-23`);
  });
});
