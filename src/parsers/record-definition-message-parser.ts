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
  /**
   * Message Structure:
   *
   * | Byte                     | Description              | Length      | Value                                                                            |
   * |--------------------------|--------------------------|-------------|----------------------------------------------------------------------------------|
   * | 0                        | Reserved                 | 1 Byte      | 0                                                                                |
   * | 1                        | Architecture             | 1 Byte      | Architecture Type                                                                |
   * |                          |                          |             | 0: Definition and Data Messages are Little Endian                                |
   * |                          |                          |             | 1: Definition and Data Message are Big Endian                                    |
   * | 2–3                      | Global Message Number    | 2 Bytes     | 0:65535 – Unique to each message                                                 |
   * |                          |                          |             | *Endianness of this 2 Byte value is defined in the Architecture byte*            |
   * | 4                        | Fields                   | 1 Byte      | Number of fields in the Data Message                                             |
   * | 5 –4 + Fields * 3        | Field Definition         | 3 Bytes     | See Field Definition Contents (Table 5)                                          |
   * |                          |                          | (per Field) |                                                                                  |
   * | 5 + Fields * 3           | # Developer Fields       | 1 Byte      | Number of Self Descriptive fields in the Data Message                            |
   * |                          |                          |             | (Only if Developer Data Flag is set)                                             |
   * | 6 + Fields * 3 - END     | Developer Field          | 3 bytes     | See Developer Data Field Definition Contents (Table 8)                           |
   * |                          | Definition               | (per Field) |                                                                                  |
   *
   */

  const architecture: Architecture = data[1];
  const globalMessageNumber = decodeTwoBytes(data.subarray(2, 4), architecture);
  const numberOfFields = data[4];
  const developerFields = data[5 + numberOfFields * FIELD_SIZE];

  const fieldDefinitions: FitDefinitionMessageField[] = Array.from(
    { length: numberOfFields },
    (_, index) => {
      const startIndex = 5 + index * FIELD_SIZE;
      return parseDefinitionField(
        data.subarray(startIndex, startIndex + FIELD_SIZE)
      );
    }
  );

  let length = 7; // Fixed length bytes
  length += numberOfFields * FIELD_SIZE + developerFields * FIELD_SIZE;

  return {
    architecture,
    globalMessageNumber,
    numberOfFields,
    fieldDefinitions,
    developerFields: 0,
    developerFieldDefinitions: [],
    length,
  };
};
