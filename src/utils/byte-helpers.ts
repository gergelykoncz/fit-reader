import { Architecture } from "../types";

export const decodeTwoBytes = (
  buffer: Buffer,
  architecture: Architecture
): number => {
  return architecture === Architecture.BigEndian
    ? buffer.readUint16BE(0)
    : buffer.readUInt16LE(0);
};

export const decodeFourBytes = (
  buffer: Buffer,
  architecture: Architecture
): number => {
  return architecture === Architecture.BigEndian
    ? buffer.readUint32BE(0)
    : buffer.readUInt32LE(0);
};
