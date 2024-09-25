import {
  parseDefinitionField,
  parseDefinitionMessage,
} from "./record-definition-message-parser";

describe("record-definition-message-parser", () => {
  describe("parseDefinitionField", () => {
    it("should parse a definition field", () => {
      const data = Buffer.from([0, 1, 2]);

      const result = parseDefinitionField(data);
      expect(result).toEqual({
        definitionNumber: 0,
        size: 1,
        baseType: 2,
      });
    });
  });

  describe("parseDefinitionMessage", () => {
    it("should parse a definition message with little endian architecture", () => {
      const data = Buffer.from([0, 0, 0, 1, 2, 1, 2, 3, 4, 5, 6, 0]);
      const result = parseDefinitionMessage(data);
      expect(result).toEqual({
        architecture: 0,
        globalMessageNumber: 256,
        numberOfFields: 2,
        fieldDefinitions: [
          { definitionNumber: 1, size: 2, baseType: 3 },
          { definitionNumber: 4, size: 5, baseType: 6 },
        ],
        developerFields: 0,
        developerFieldDefinitions: [],
        length: 13,
      });
    });

    it("should parse a definition message with big endian architecture", () => {
      const data = Buffer.from([0, 1, 1, 0, 2, 1, 2, 3, 4, 5, 6, 0]);
      const result = parseDefinitionMessage(data);
      expect(result).toEqual({
        architecture: 1,
        globalMessageNumber: 256,
        numberOfFields: 2,
        fieldDefinitions: [
          { definitionNumber: 1, size: 2, baseType: 3 },
          { definitionNumber: 4, size: 5, baseType: 6 },
        ],
        developerFields: 0,
        developerFieldDefinitions: [],
        length: 13,
      });
    });
  });
});
