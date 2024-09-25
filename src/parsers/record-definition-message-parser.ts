import {
  Architecture,
  FitDefinitionMessage,
  FitDefinitionMessageField,
} from "../types";
import { decodeTwoBytes } from "../utils";

const FIELD_SIZE = 3;

export const parseDefinitionField = (
  data: Buffer
): FitDefinitionMessageField => {
  return {
    definitionNumber: data[0],
    size: data[1],
    baseType: data[2],
  };
};

export const parseDefinitionMessage = (data: Buffer): FitDefinitionMessage => {
  const architecture: Architecture = data[2];
  const globalMessageNumber = decodeTwoBytes(data.subarray(3, 5), architecture);
  const numberOfFields = data[5];

  const fieldDefinitions: FitDefinitionMessageField[] = [];
  for (let i = 6; i < 6 + numberOfFields * FIELD_SIZE; i += FIELD_SIZE) {
    fieldDefinitions.push(
      parseDefinitionField(data.subarray(i, i + FIELD_SIZE))
    );
  }

  return {
    architecture,
    globalMessageNumber,
    fields: numberOfFields,
    fieldDefinitions,
    developerFields: 0,
    developerFieldDefinitions: [],
  };
};
