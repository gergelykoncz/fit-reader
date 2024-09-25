import { parseDefinitionMessage, parseRecordHeader } from "./parsers";
import { FitRecord, FitRecordHeader } from "./types";

const FIELD_SIZE = 3;

export const parseRecord = (data: Buffer): FitRecord => {
  console.log(data);
  const header = parseRecordHeader(data[0]);
  let length = 1; // Header is the first byte
  let body;
  if (isDefinitionMessage(header)) {
    length += 6; // fixed size
    const numberOfFields = data[4];
    const numberOfDeveloperFields = data[5 + numberOfFields * FIELD_SIZE];

    length +=
      numberOfFields * FIELD_SIZE + numberOfDeveloperFields * FIELD_SIZE;

    body = parseDefinitionMessage(data);
  } else {
    throw 1;
  }

  return { header, length, body };
};

const isDefinitionMessage = (header: FitRecordHeader) =>
  "messageType" in header && header.messageType === "definition";
