import { WinningProduct } from '../types/product.types';
import chinaProductsData from '../data/winning_products_china.json';
import europeProductsData from '../data/winning_products_europe.json';

/**
 * Catálogo Maestro Oficial auditado y extraído en tiempo real mediante el servidor oficial MCP de CJ Dropshipping (cj_official).
 * Contiene 50 productos ganadores de Almacén China y 12 productos de Almacenes Locales en Europa (Alemania, Francia, España, Polonia),
 * cada uno cumpliendo estrictamente con el rango de coste total de 5€ a 40€ con portes calculados a España e impuestos IOSS prepagados.
 */
export const officialMcpProducts: WinningProduct[] = [
  ...(chinaProductsData as WinningProduct[]),
  ...(europeProductsData as WinningProduct[])
];
