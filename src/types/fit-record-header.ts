export interface FitRecordNormalHeader {
  messageType: "definition" | "data";
  localMessageType: number;
}

export interface FitRecordCompressedHeader {
  localMessageType: number;
  timeOffset: number;
}

export type FitRecordHeader = FitRecordCompressedHeader | FitRecordNormalHeader;
