/**
 * Tipos e interfaces de datos para productos ganadores, variantes reales,
 * almacenes logísticos y delimitación geográfica de mercado en España y Europa.
 */

export type NicheCategory = 'Belleza' | 'Salud' | 'Seguridad/Tecnología' | 'Todos';
export type WarehouseFilter =
  | 'Todos'
  | 'China (Global 6-9d)'
  | 'Almacenes Locales Europa'
  | 'China (Nuevo MCP)'
  | 'Europa (Nuevo MCP)';

export interface ProductVariant {
  vid: string;
  variantName: string;
  variantSku: string;
  variantPrice: number;
  variantShipping?: number;
  variantWeight: number;
  inventory?: number;
  shippingLine?: string;
  aging?: string;
}

export interface WinningProduct {
  pid: string;
  productName: string;
  productNameEn: string;
  productSku: string;
  productImage: string;
  productWeight: number; // Gramos
  categoryId: string;
  categoryName: string;
  sellPrice: number; // Coste CJ real en EUR para la variante recomendada
  estimatedShipping: number; // Portes a España en EUR
  salesVolume: number;
  listingCount: number;
  niche: 'Belleza' | 'Salud' | 'Seguridad/Tecnología';
  problemSolved: string;
  perceivedValue: 'Alto' | 'Muy Alto' | 'Extremo';
  fastShippingAvailable: boolean;
  deliveryDays: string;
  description: string;
  variants: ProductVariant[];
  targetAudience: string;
  suggestedAngles: string[];
  cjUrl: string; // Enlace directo canónico a CJ Dropshipping
  
  // Almacén y Logística
  warehouseType: 'China' | 'Europa' | 'China (Nuevo MCP)' | 'Europa (Nuevo MCP)';
  warehouseLocation: string; // Ej: "Almacén Central (China)" o "Almacén Alemania (DE)"
  targetMarketNotice: string; // Nota explícita de mercado
  iossIncluded: boolean; // Si incluye IVA/IOSS y aranceles despachados
  
  // Estudio de mercado y competencia
  marketPriceRange: string; // Rango de precio en Amazon.es y Shopify España
  competitorBenchmark: string; // Análisis de precios de competidores
  recommendedSellingPrice: number; // Precio óptimo de venta
}

export interface FinancialBreakdown {
  sourcingCost: number;
  shippingCost: number;
  cogs: number;
  retailPrice: number;
  paymentFee: number;
  grossProfit: number;
  estimatedCac: number;
  netProfit: number;
  profitMarginPercent: number;
  roiPercent: number;
  breakEvenRoas: number;
  maxAllowableCac: number;
}

export interface ProductFilterState {
  searchQuery: string;
  selectedNiche: NicheCategory;
  selectedWarehouse: WarehouseFilter;
  priceRange: [number, number];
  multiplier: 2 | 3;
  fastShippingOnly: boolean;
  sortBy: 'salesVolume' | 'netProfit' | 'sourcingCost' | 'roi';
}
