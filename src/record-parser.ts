import {
  parseDataMessage,
  parseDefinitionMessage,
  parseRecordHeader,
} from "./parsers";
import { FitRecord, FitRecordHeader } from "./types";

const definitions: FitRecord[] = [];

export const parseRecord = (data: Buffer): FitRecord => {
  const header: FitRecordHeader = parseRecordHeader(data[0]);
  let body;
  if (isDefinitionMessage(header)) {
    // Remove the message header
    body = parseDefinitionMessage(data.subarray(1, data.length));
    definitions.push({ header, body, length: body.length });
  } else {
    console.log(header);
    const definition = definitions.find(
      (x) => x.header.localMessageType === header.localMessageType
    );
    if (definition && "architecture" in definition.body) {
      body = parseDataMessage(data.subarray(1, data.length), definition?.body);
    } else {
      throw 1;
    }
  }

  return { header, length: body.length, body };
};

const isDefinitionMessage = (header: FitRecordHeader) =>
  "messageType" in header && header.messageType === "definition";
