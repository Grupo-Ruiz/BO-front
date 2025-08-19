// src/shared/data/companies.ts
// Mock de empresas reales para login y selección

export interface Company {
  id: number;
  name: string;
  cif: string;
  address: string;
  postal_code: string;
  locality: string;
  province: string;
  country: string;
}

export const COMPANIES: Company[] = [
  // { id: 2, name: 'AUTOPERIFERIA', cif: 'A28091262', address: 'Calle Neptuno, 6', postal_code: '28229', locality: 'Villanueva del Pardillo', province: 'Madrid', country: 'España' },
  // { id: 3, name: 'TRANSPORTES URBANOS DE BADAJOZ, S.A.', cif: 'A24050015', address: 'Avenida Francisco Rodríguez Romero, 15', postal_code: '06006', locality: 'Badajoz', province: 'Badajoz', country: 'España' },
  // { id: 4, name: 'EMPRESA MARTIN, SA', cif: 'A28106003', address: '', postal_code: '', locality: '', province: '', country: '' },
  // { id: 5, name: 'EMPRESA RUIZ, SA', cif: 'A28131274', address: '', postal_code: '', locality: '', province: '', country: '' },
  // { id: 6, name: 'RUADE, S.A.', cif: 'A28609196', address: 'Torres Quevedo, 3', postal_code: '28914', locality: 'Leganés', province: 'Madrid', country: 'España' },
  { id: 7, name: 'SALAMANCA DE TRANSPORTES, S.A.', cif: 'A37043015', address: 'C/ Hoyamoros, 55-Pol. Ind. Motalvo II', postal_code: '37008', locality: 'Salamanca', province: 'Salamanca', country: 'España' },
  // { id: 8, name: 'SIE 2000, SL', cif: 'B06313530', address: 'Avenida Francisco Rodríguez Romero, 15 Nav', postal_code: '', locality: 'Badajoz', province: 'Badajoz', country: 'España' },
  { id: 9, name: 'UNAUTO', cif: 'B28393882', address: 'Calle Molinos de viento, 3. Polígono Industrial de Toledo', postal_code: '45007', locality: 'Toledo', province: 'Toledo', country: 'España' },
  // { id: 10, name: 'TRANSPORTES URBANOS DE LINARES, SL', cif: 'B84358456', address: 'C./ Mina de Arrayanes s/n Polígono industrial los Jarales II ', postal_code: '23700', locality: 'Linares', province: 'Jaén', country: 'España' },
  // { id: 11, name: 'U.T.E. TRANSPORTES DE MURCIA', cif: 'U73755449', address: '', postal_code: '', locality: '', province: '', country: '' },
  // { id: 12, name: 'RUIZ MOVILIDAD Y TRANSPORTE, S.L.', cif: 'B87857918', address: 'C/ Julio Palacios, 12', postal_code: '28914', locality: 'Leganés', province: 'Madrid', country: 'España' },
  // { id: 13, name: 'INTEGRA MOVILIDAD, SA', cif: 'A78866712', address: 'C/ Julio Palacios, 12', postal_code: '28914', locality: 'Leganés', province: 'Madrid', country: 'España' },
  // { id: 14, name: 'TRAMSBRA, SA', cif: 'A28091163', address: 'Torres Quevedo, 3', postal_code: '28914', locality: 'Leganés', province: 'Madrid', country: 'España' },
  // { id: 15, name: 'ENERGREENMOVILITY, SL', cif: 'B88424445', address: 'C/ Julio Palacios, 12', postal_code: '28914', locality: 'Leganés', province: 'Madrid', country: 'España' },
  // { id: 17, name: 'VANWARDIA', cif: 'B82954561', address: 'Torres Quevedo, 3 – P.I. Nuestra Señora de Butarque', postal_code: '28914', locality: 'Leganés', province: 'Madrid', country: 'España' },
  // { id: 18, name: 'UTE EMPRESA RUIZ, S.A. Y ESTACION AUTOBUSES ESCORIAL', cif: 'U87017653', address: 'Avenida Alfonso Peña, S/N', postal_code: '', locality: 'zamora', province: 'Almería', country: 'España' },
  // { id: 19, name: 'Cía. de Vehículos Discrecionales CTM, S.L.', cif: 'B72289960', address: '', postal_code: '', locality: '', province: '', country: 'España' },
  // { id: 20, name: 'AUTOBUS URBANS DE TANGER S.A.', cif: '4905354', address: 'KM 2,2 ROUTE DE TETOUAN', postal_code: '', locality: '', province: 'Tanger', country: 'Marruecos' },
  // { id: 21, name: 'MINITS, MT', cif: 'A,78866712', address: 'C/ Julio Palacios, 12', postal_code: '28914', locality: 'Leganes', province: 'Madrid', country: 'España' },
  // { id: 22, name: 'SERVICIOS DE APOYO A LA MOVILIDAD MADRID, S.L.U.', cif: 'B67648758', address: 'c/ Julio Palacios, 12', postal_code: '28914', locality: 'LEGANES', province: 'Madrid', country: 'España' },
];
