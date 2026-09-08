import { WinningProduct, FinancialBreakdown, ProductVariant } from '../types/product.types';

/**
 * Calcula el desglose financiero completo de un producto para una venta en España.
 * Permite seleccionar una variante específica y simular escenarios con CAC o portes personalizados.
 *
 * @param {WinningProduct} product Objeto con datos del producto.
 * @param {number} multiplier Multiplicador del coste total COGS (por defecto 3).
 * @param {number} [customCac] Coste de adquisición publicitaria estimado por venta (por defecto 9.50€).
 * @param {number} [customShipping] Coste de envío personalizado.
 * @param {ProductVariant} [selectedVariant] Variante específica seleccionada.
 * @returns {FinancialBreakdown} Desglose financiero con métricas de beneficio, margen, ROI y CAC de equilibrio.
 */
export function calculateFinancials(
  product: WinningProduct,
  multiplier: number = 3,
  customCac?: number,
  customShipping?: number,
  selectedVariant?: ProductVariant
): FinancialBreakdown {
  const sourcingCost = selectedVariant ? selectedVariant.variantPrice : product.sellPrice;
  const shippingCost = customShipping ?? (selectedVariant?.variantShipping ?? product.estimatedShipping);
  const cogs = Number((sourcingCost + shippingCost).toFixed(2));

  // Cálculo del PVP sugerido con terminación en .95
  const rawPrice = cogs * multiplier;
  const retailPrice = Number((Math.floor(rawPrice) + 0.95).toFixed(2));

  // Pasarela de pago estándar en España (Shopify Payments / Stripe: 2.9% + 0.30€)
  const paymentFee = Number((retailPrice * 0.029 + 0.30).toFixed(2));

  // Beneficio Bruto
  const grossProfit = Number((retailPrice - cogs - paymentFee).toFixed(2));

  // CAC estimado por venta (Meta / TikTok Ads en España)
  const estimatedCac = customCac !== undefined ? customCac : 9.50;

  // Beneficio Neto Limpio
  const netProfit = Number((grossProfit - estimatedCac).toFixed(2));

  // Margen Neto y ROI
  const profitMarginPercent = retailPrice > 0 ? Number(((netProfit / retailPrice) * 100).toFixed(1)) : 0;
  const totalCostBasis = cogs + paymentFee + estimatedCac;
  const roiPercent = totalCostBasis > 0 ? Number(((netProfit / totalCostBasis) * 100).toFixed(1)) : 0;

  // ROAS de equilibrio (Break-even ROAS = Retail Price / Gross Profit)
  const breakEvenRoas = grossProfit > 0 ? Number((retailPrice / grossProfit).toFixed(2)) : 0;

  // CAC Máximo permitido sin perder dinero
  const maxAllowableCac = grossProfit;

  return {
    sourcingCost,
    shippingCost,
    cogs,
    retailPrice,
    paymentFee,
    grossProfit,
    estimatedCac,
    netProfit,
    profitMarginPercent,
    roiPercent,
    breakEvenRoas,
    maxAllowableCac
  };
}

/**
 * Formatea un número como moneda Euro (€) en formato español.
 *
 * @param {number} amount Cantidad numérica a formatear.
 * @returns {string} Cadena formateada (ej: "24,95 €").
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}
