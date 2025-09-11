
// Tipos usados en el módulo
export interface QrData {
  ticketNumber: string;
  equipmentType: number;
  equipmentCode: number;
  keyIndex: number;
  qrVersion: number;
  startValidity: string;
  endValidity: string;
  lineCode: number;
  titleCode: number;
  fareCode: number;
  stopType: number;
  originCode: number;
  destinationCode: number;
  rawCode: string;
}