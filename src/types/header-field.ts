export interface HeaderField {
  start: number;
  end: number;
  type: "uint8" | "uint16" | "uint32" | "ascii";
  name: string;
}
