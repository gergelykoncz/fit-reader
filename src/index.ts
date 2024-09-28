import { readFile } from "fs";
import { parseFileHeader } from "./parsers";
import { parseRecord } from "./record-parser";

readFile("./test/test.fit", (err, data) => {
  if (err) {
    console.error(`Failed to parse test file with error ${err}`);
  }
  if (data) {
    const header = parseFileHeader(data);
    console.log(header);
    let recordIndex = 14;
    while (recordIndex < data.length) {
      console.log("reading record at index", recordIndex);
      const record = parseRecord(data.subarray(recordIndex, data.length));
      console.log(record);
      recordIndex += record.length - 1;
    }
  }
});
