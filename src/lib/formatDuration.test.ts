import { formatDurationInMin } from "./formatDuration";

describe("Функция форматирования времени", () => {
  it("Правильно форматирует число в строку", () => {
    const result = formatDurationInMin(6);
    expect(result).toBe("0:06");
  });

  it("Правильно форматирует число 0 в строку", () => {
    const result = formatDurationInMin(0);
    expect(result).toBe("0:00");
  });

  it("Правильно форматирует минуты", () => {
    const result = formatDurationInMin(120);
    expect(result).toBe("2:00");
  });
});