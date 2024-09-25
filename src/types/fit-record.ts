import { FitRecordHeader } from "./fit-record-header";

export enum Architecture {
  LittleEndian = 0,
  BigEndian = 1,
}

export interface FitDefinitionMessageField {
  definitionNumber: number;
  size: number;
  baseType: number;
}

export interface FitDefinitionMessage {
  architecture: Architecture;
  globalMessageNumber: number;
  fields: number;
  fieldDefinitions: FitDefinitionMessageField[];
  developerFields: number;
  developerFieldDefinitions: [];
}

export interface FitRecord {
  header: FitRecordHeader;
  length: number;
  body: FitDefinitionMessage;
}
