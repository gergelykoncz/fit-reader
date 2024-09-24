import { parseHeader } from "./header-parser";

describe("header-parser", () => {
  describe("parseHeader", () => {
    it("should parse the standard FIT header", () => {
      const buffer = Buffer.alloc(14);
      buffer.writeUInt8(14, 0); // Header size
      buffer.writeUInt8(1, 1); // Protocol version
      buffer.writeUInt16LE(100, 2); // Profile version
      buffer.writeUInt32LE(1000, 4); // Data size
      buffer.write(".FIT", 8); // Data type
      buffer.writeUInt16LE(123, 12); // CRC

      const result = parseHeader(buffer);

      expect(result).toEqual([
        { name: "Header size", value: 14 },
        { name: "Protocol version", value: 1 },
        { name: "Profile version", value: 100 },
        { name: "Data size", value: 1000 },
        { name: "Data type", value: ".FIT" },
        { name: "Crc", value: 123 },
      ]);
    });
  });
});
