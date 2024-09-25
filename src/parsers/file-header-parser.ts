import { decodeFourBytes, decodeTwoBytes } from "../utils";
import { Architecture, HeaderField, NameValuePair } from "../types";

const HEADER_LAYOUT: HeaderField[] = [
  { start: 0, end: 1, type: "uint8", name: "Header size" },
  { start: 1, end: 2, type: "uint8", name: "Protocol version" },
  { start: 2, end: 4, type: "uint16", name: "Profile version" },
  { start: 4, end: 8, type: "uint32", name: "Data size" },
  { start: 8, end: 12, type: "ascii", name: "Data type" },
  { start: 12, end: 14, type: "uint16", name: "Crc" },
];

export const parseFileHeader = (
  data: Buffer
): NameValuePair<string | number>[] => {
  return HEADER_LAYOUT.map((field: HeaderField) => {
    const { start, end, type, name } = field;
    const slice = data.subarray(start, end);
    let value = null;
    switch (type) {
      case "uint8":
        value = slice[0];
        break;
      case "uint16":
        value = decodeTwoBytes(slice, Architecture.LittleEndian);
        break;
      case "uint32":
        value = decodeFourBytes(slice, Architecture.LittleEndian);
        break;
      case "ascii":
        value = slice.toString();
        break;
    }

    return { name, value };
  });
};
