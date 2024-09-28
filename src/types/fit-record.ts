import { FitRecordHeader } from "./fit-record-header";

export enum Architecture {
  LittleEndian = 0,
  BigEndian = 1,
}

export interface FitDefinitionMessageField {
  definitionNumber: number;
  size: number;
  baseType: BaseType;
}

export interface FitDefinitionMessage {
  architecture: Architecture;
  globalMessageNumber: number;
  numberOfFields: number;
  fieldDefinitions: FitDefinitionMessageField[];
  developerFields: number;
  developerFieldDefinitions: [];
  length: number;
}

export interface FitDataMessage {
  values: unknown[];
  length: number;
}

export interface FitRecord {
  header: FitRecordHeader;
  length: number;
  body: FitDefinitionMessage | FitDataMessage;
}

export enum BaseType {
  ENUM = 0,
  SINT8 = 1,
  UINT8 = 2,
  SINT16 = 131,
  UINT16 = 132,
  SINT32 = 133,
  UINT32 = 134,
  STRING = 7,
  FLOAT32 = 136,
  FLOAT64 = 137,
  UINT8Z = 10,
  UINT16Z = 139,
  UINT32Z = 140,
  BYTE = 13,
  SINT64 = 142,
  UINT64 = 143,
  UINT64Z = 144,
}
