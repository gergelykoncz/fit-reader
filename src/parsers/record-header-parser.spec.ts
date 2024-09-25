import { parseRecordHeader } from "./record-header-parser";

describe("record-header-parser", () => {
  describe("parseRecordHeader", () => {
    it("should parse a normal data message header", () => {
      const headerByte = 0b00000100;

      const result = parseRecordHeader(headerByte);

      expect(result).toEqual({
        localMessageType: 4,
        messageType: "data",
      });
    });
  });

  it("should parse a normal definition message header", () => {
    const headerByte = 0b01001111;

    const result = parseRecordHeader(headerByte);

    expect(result).toEqual({
      localMessageType: 15,
      messageType: "definition",
    });
  });

  it("should parse a compressed timestamp header", () => {
    const headerByte = 0b11111111;

    const result = parseRecordHeader(headerByte);

    expect(result).toEqual({
      localMessageType: 3,
      timeOffset: 31,
    });
  });
});
