import { readFile } from "fs";
import { parseHeader } from "./header-parser";

readFile("./test/test.fit", (err, data) => {
  if (err) {
    console.error(`Failed to parse test file with error ${err}`);
  }
  if (data) {
    console.log(parseHeader(data));
  }
});
