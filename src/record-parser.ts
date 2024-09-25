import { parseDefinitionMessage, parseRecordHeader } from "./parsers";
import { FitRecord, FitRecordHeader } from "./types";

export const parseRecord = (data: Buffer): FitRecord => {
  const header = parseRecordHeader(data[0]);
  let body;
  if (isDefinitionMessage(header)) {
    // Remove the message header
    body = parseDefinitionMessage(data.subarray(1, data.length));
  } else {
    throw 1;
  }

  return { header, length: body.length, body };
};

const isDefinitionMessage = (header: FitRecordHeader) =>
  "messageType" in header && header.messageType === "definition";
