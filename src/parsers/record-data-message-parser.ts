import {
  Architecture,
  FitDefinitionMessage,
  FitDefinitionMessageField,
} from "../types";
import { BaseType } from "../types";

export const readField = (
  data: Buffer,
  field: FitDefinitionMessageField,
  offset: number,
  architecture: Architecture
) => {
  switch (field.baseType) {
    case BaseType.BYTE:
    case BaseType.ENUM:
    case BaseType.UINT8:
    case BaseType.UINT8Z:
      return data.readUint8(offset);
    case BaseType.SINT8:
      return data.readInt8(offset);
    case BaseType.UINT16:
    case BaseType.UINT16Z:
      if (architecture === Architecture.LittleEndian) {
        return data.readUint16LE(offset);
      } else {
        return data.readUint16BE(offset);
      }
    case BaseType.SINT16:
      if (architecture === Architecture.LittleEndian) {
        return data.readInt16LE(offset);
      } else {
        return data.readInt16BE(offset);
      }
    case BaseType.UINT32:
    case BaseType.UINT32Z:
      if (architecture === Architecture.LittleEndian) {
        return data.readUint32LE(offset);
      } else {
        return data.readUint32BE(offset);
      }
    case BaseType.SINT32:
      if (architecture === Architecture.LittleEndian) {
        return data.readInt32LE(offset);
      } else {
        return data.readInt32BE(offset);
      }
    case BaseType.UINT64:
    case BaseType.UINT64Z:
      if (architecture === Architecture.LittleEndian) {
        return data.readBigUint64LE(offset);
      } else {
        return data.readBigUint64BE(offset);
      }
    case BaseType.SINT64:
      if (architecture === Architecture.LittleEndian) {
        return data.readBigInt64LE(offset);
      } else {
        return data.readBigInt64BE(offset);
      }
    case BaseType.FLOAT32:
    case BaseType.FLOAT64:
      if (architecture === Architecture.LittleEndian) {
        return data.readFloatLE(offset);
      } else {
        return data.readFloatBE(offset);
      }
  }
};

export const parseDataMessage = (
  data: Buffer,
  definition: FitDefinitionMessage
) => {
  let offset = 0;
  return {
    values: definition.fieldDefinitions.map((field) => {
      const value = readField(data, field, offset, definition.architecture);
      offset += field.size;
      console.log(field, value);
      return value;
    }),
    length: offset,
  };
};
