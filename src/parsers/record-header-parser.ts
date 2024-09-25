import { FitRecordHeader } from "../types";

export const parseRecordHeader = (headerByte: number): FitRecordHeader => {
  /**
   * Bit Value Description:
   *
   * | Bit   | Value     | Description                                          |
   * |-------|-----------|------------------------------------------------------|
   * | 7     | 0         | Normal Header                                        |
   * | 6     | 0 or 1    | Message Type                                         |
   * |       |           | 1: Definition Message                                |
   * |       |           | 0: Data Message                                      |
   * | 5     | 0         | Message Type Specific (default)                      |
   * | 4     | 0         | Reserved                                             |
   * | 0 - 3 | 0 - 15    | Local Message Type                                   |
   */
  const isNormalHeader = !(headerByte & 0b10000000);
  if (isNormalHeader) {
    return {
      localMessageType: headerByte & 0b00001111,
      messageType: headerByte & 0b01000000 ? "definition" : "data",
    };
  } else {
    return {
      localMessageType: (headerByte & 0b01100000) >> 5,
      timeOffset: headerByte & 0b00011111,
    };
  }
};
