import { decodeFourBytes, decodeTwoBytes } from "./byte-helpers";

describe("byte-helpers", () => {
  describe("decodeTwoBytes", () => {
    it("should read first two bytes in low-endian and return uint16", () => {
      const VALUE = 128;
      const buffer = Buffer.alloc(2);
      buffer.writeUInt16LE(VALUE, 0);

      const result = decodeTwoBytes(buffer);
      expect(result).toEqual(VALUE);
    });
  });

  describe("decodeFourBytes", () => {
    it("should read first four bytes in low-endian and return uint32", () => {
      const VALUE = 1024;
      const buffer = Buffer.alloc(6);
      buffer.writeUInt16LE(VALUE, 0);

      const result = decodeFourBytes(buffer);
      expect(result).toEqual(VALUE);
    });
  });
});
