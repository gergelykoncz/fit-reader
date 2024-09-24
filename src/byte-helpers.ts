export const decodeTwoBytes = (buffer: Buffer) => {
  return buffer.readUInt16LE(0);
};

export const decodeFourBytes = (buffer: Buffer) => {
  return buffer.readUint32LE(0);
};
