'use client';

import React, { useState, useEffect } from 'react';
import { WinningProduct, ProductVariant } from '../types/product.types';
import { calculateFinancials, formatCurrency } from '../lib/financialCalculations';
import {
  X,
  Calculator,
  Sliders,
  Sparkles,
  ExternalLink,
  Store,
  ShieldCheck,
  Building2,
  Plane,
  Target
} from 'lucide-react';

interface MarginCalculatorModalProps {
  product: WinningProduct;
  initialVariant?: ProductVariant;
  onClose: () => void;
}

/**
 * Modal interactivo para simulación avanzada de rentabilidad con soporte de selección de variantes,
 * costes aduaneros IOSS y cálculo según almacén de origen (China vs Europa).
 *
 * @param {MarginCalculatorModalProps} props Producto seleccionado, variante inicial y manejador de cierre.
 * @returns {React.JSX.Element} Elemento JSX renderizado.
 */
export const MarginCalculatorModal: React.FC<MarginCalculatorModalProps> = ({
  product,
  initialVariant,
  onClose
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    initialVariant || product.variants?.[0]
  );
  const [multiplier, setMultiplier] = useState<number>(3);
  const [estimatedCac, setEstimatedCac] = useState<number>(9.50);
  const [shippingCost, setShippingCost] = useState<number>(
    initialVariant?.variantShipping ?? product.variants?.[0]?.variantShipping ?? product.estimatedShipping
  );
  const [monthlyUnits, setMonthlyUnits] = useState<number>(150);

  useEffect(() => {
    if (initialVariant) {
      setSelectedVariant(initialVariant);
      setShippingCost(initialVariant.variantShipping ?? product.estimatedShipping);
    } else if (product.variants?.[0]) {
      setSelectedVariant(product.variants[0]);
      setShippingCost(product.variants[0].variantShipping ?? product.estimatedShipping);
    }
  }, [initialVariant, product]);

  const handleVariantChange = (vid: string) => {
    const v = product.variants?.find((item) => item.vid === vid);
    if (v) {
      setSelectedVariant(v);
      setShippingCost(v.variantShipping ?? product.estimatedShipping);
    }
  };

  const financials = calculateFinancials(product, multiplier, estimatedCac, shippingCost, selectedVariant);
  const monthlyRevenue = financials.retailPrice * monthlyUnits;
  const monthlyTotalCogs = financials.cogs * monthlyUnits;
  const monthlyAdSpend = estimatedCac * monthlyUnits;
  const monthlyPaymentFees = financials.paymentFee * monthlyUnits;
  const monthlyNetProfit = financials.netProfit * monthlyUnits;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Cabecera del Modal */}
        <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex justify-between items-center z-10">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900">
                  Simulador de Rentabilidad & Validación Real
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 flex items-center gap-1">
                  {product.warehouseType === 'Europa' ? (
                    <>
                      <Building2 className="h-3 w-3" />
                      <span>{product.warehouseLocation}</span>
                    </>
                  ) : (
                    <>
                      <Plane className="h-3 w-3" />
                      <span>{product.warehouseLocation}</span>
                    </>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-xs text-slate-500 line-clamp-1">{product.productName}</p>
                <a
                  href={product.cjUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-orange-600 hover:text-orange-700 underline inline-flex items-center gap-1 shrink-0"
                >
                  Ver en CJ <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Fila Principal: Controles Interactivos vs Resultados */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Columna Izquierda: Deslizadores y Controles */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Sliders className="h-4 w-4 text-emerald-600" />
                Variables de Simulación
              </h3>

              {/* Selector de Variante en el Modal */}
              {product.variants && product.variants.length > 1 && (
                <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold text-slate-700">Seleccionar Variante / Color:</span>
                  <select
                    value={selectedVariant?.vid}
                    onChange={(e) => handleVariantChange(e.target.value)}
                    className="w-full mt-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {product.variants.map((v) => (
                      <option key={v.vid} value={v.vid}>
                        {v.variantName} (Coste CJ: {formatCurrency(v.variantPrice)})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Estudio de mercado comparativo */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-amber-950">
                  <Store className="h-4 w-4 text-amber-700" />
                  <span>Referencia de Mercado en España (Amazon/Shopify):</span>
                </div>
                <div className="text-sm font-black text-amber-900">{product.marketPriceRange}</div>
                <p className="text-[11px] text-amber-800 leading-relaxed">{product.competitorBenchmark}</p>
              </div>

              {/* Multiplicador / PVP */}
              <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">Multiplicador de Precio:</span>
                  <span className="font-black text-emerald-700 text-sm">
                    x{multiplier.toFixed(1)} ({formatCurrency(financials.retailPrice)})
                  </span>
                </div>
                <input
                  type="range"
                  min="1.5"
                  max="4.0"
                  step="0.1"
                  value={multiplier}
                  onChange={(e) => setMultiplier(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>x1.5 (Ajustado)</span>
                  <span>x2.0 (Estándar)</span>
                  <span>x3.0 (Recomendado)</span>
                  <span>x4.0 (Premium)</span>
                </div>
              </div>

              {/* Coste Publicitario por Venta (CAC) */}
              <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">Coste Adquisición Ads (CAC estimado):</span>
                  <span className="font-black text-slate-900 text-sm">
                    {formatCurrency(estimatedCac)} / venta
                  </span>
                </div>
                <input
                  type="range"
                  min="3.0"
                  max="20.0"
                  step="0.5"
                  value={estimatedCac}
                  onChange={(e) => setEstimatedCac(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              {/* Portes de Envío */}
              <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">Coste de Envío a España:</span>
                  <span className="font-black text-slate-900 text-sm">
                    {formatCurrency(shippingCost)}
                  </span>
                </div>
                <input
                  type="range"
                  min="2.50"
                  max="12.0"
                  step="0.1"
                  value={shippingCost}
                  onChange={(e) => setShippingCost(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                />
              </div>

              {/* Ventas Mensuales Estimadas */}
              <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">Volumen de Ventas Mensuales:</span>
                  <span className="font-black text-slate-900 text-sm">
                    {monthlyUnits} unidades ({Math.round(monthlyUnits / 30)} pedidos/día)
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="600"
                  step="10"
                  value={monthlyUnits}
                  onChange={(e) => setMonthlyUnits(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>
            </div>

            {/* Columna Derecha: Tarjeta de Rentabilidad Proyectada */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              {/* Proyección Mensual */}
              <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                      Beneficio Neto Mensual Estimado
                    </span>
                    <div className={`text-3xl sm:text-4xl font-black mt-1 ${monthlyNetProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {formatCurrency(monthlyNetProfit)}
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 border border-slate-700 text-slate-300">
                    ROI {financials.roiPercent}%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
                  <div>
                    <div className="text-slate-400">Facturación Bruta:</div>
                    <div className="text-sm font-bold text-white">{formatCurrency(monthlyRevenue)}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Inversión Ads Total:</div>
                    <div className="text-sm font-bold text-amber-400">{formatCurrency(monthlyAdSpend)}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Coste Producto + Envíos:</div>
                    <div className="text-sm font-bold text-white">{formatCurrency(monthlyTotalCogs)}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Comisiones Pasarela:</div>
                    <div className="text-sm font-bold text-slate-300">{formatCurrency(monthlyPaymentFees)}</div>
                  </div>
                </div>
              </div>

              {/* Cascada de Costes por Unidad */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
                <div className="font-bold text-slate-800 mb-2">Desglose Unitario por Venta:</div>
                <div className="flex justify-between text-slate-600">
                  <span>Precio de Venta al Cliente:</span>
                  <span className="font-bold text-slate-900">+{formatCurrency(financials.retailPrice)}</span>
                </div>
                <div className="flex justify-between text-rose-600">
                  <span>- Coste Proveedor CJ ({selectedVariant?.variantName || 'Variante Base'}):</span>
                  <span>-{formatCurrency(financials.sourcingCost)}</span>
                </div>
                <div className="flex justify-between text-rose-600">
                  <span>- Portes a España ({product.deliveryDays}):</span>
                  <span>-{formatCurrency(financials.shippingCost)}</span>
                </div>
                <div className="flex justify-between text-rose-600">
                  <span>- Pasarela Shopify/Stripe (2.9% + 0.30€):</span>
                  <span>-{formatCurrency(financials.paymentFee)}</span>
                </div>
                <div className="flex justify-between text-amber-700">
                  <span>- Coste de Adquisición Ads (CAC):</span>
                  <span>-{formatCurrency(estimatedCac)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-sm text-emerald-700">
                  <span>= Beneficio Limpio por Unidad:</span>
                  <span>{formatCurrency(financials.netProfit)} ({financials.profitMarginPercent}%)</span>
                </div>
              </div>

              {/* Certificación Aduanera IOSS */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Garantía Fiscal IOSS:</strong> El envío incluye el despacho aduanero y la liquidación del 21% de IVA europeo. Tu cliente en España no pagará ningún recargo en Correos.
                </p>
              </div>
            </div>
          </div>

          {/* Sección de Ángulos de Marketing */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              <h3 className="font-bold text-sm uppercase tracking-wider text-emerald-300">
                Estrategia Creativa & Ángulos de Venta en España
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {product.suggestedAngles.map((angle, index) => (
                <div
                  key={index}
                  className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-slate-200 flex items-start gap-2"
                >
                  <Target className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{angle}</span>
                </div>
              ))}
            </div>

            <div className="text-xs text-slate-300 pt-2 border-t border-slate-700">
              <strong className="text-white">Público Objetivo Ideal:</strong> {product.targetAudience}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
