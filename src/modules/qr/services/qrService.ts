import type { QrData } from "../types";

// Mock data para QR (temporal)
export const dataMock: QrData = {
  ticketNumber: "AA00119",
  equipmentType: 99,
  equipmentCode: 0,
  keyIndex: 1,
  qrVersion: 1,
  startValidity: "2025-04-10T12:00:00",
  endValidity: "2026-08-29T11:00:00",
  lineCode: 0,
  titleCode: 1000,
  fareCode: 0,
  stopType: 0,
  originCode: 0,
  destinationCode: 0,
  rawCode: "IEFBMDAxMTljAAAB9Kc3qpB/16LJA/ecSgpKw1DyxFQDnfFag01RQNMuSJQ="
};


/**
 * Simula una petición GET para obtener un QR
 */
export const getQR = async (): Promise<QrData> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return dataMock;
};