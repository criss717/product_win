import React, { useState } from 'react';
import { WinningProduct, ProductVariant } from '../types/product.types';
import { calculateFinancials, formatCurrency } from '../lib/financialCalculations';
import {
  TrendingUp,
  Truck,
  Calculator,
  CheckCircle2,
  ExternalLink,
  ShoppingBag,
  Sparkles,
  Store,
  Package,
  ShieldCheck,
  Building2,
  Plane,
  MapPin,
  ChevronDown,
  ChevronUp,
  Target,
  Megaphone
} from 'lucide-react';

interface ProductCardProps {
  product: WinningProduct;
  multiplier: 2 | 3;
  onOpenCalculator: (product: WinningProduct, selectedVariant?: ProductVariant) => void;
  onOpenShopifySync: (product: WinningProduct) => void;
}

/**
 * Componente de tarjeta de producto ganador con diseño horizontal tipo lista/feed.
 * Distribuye la imagen a la izquierda, la información comercial en el centro y las métricas financieras
 * a la derecha, con un panel desplegable de ancho completo para el análisis de competencia y marketing.
 *
 * @param {ProductCardProps} props Propiedades del producto, multiplicador y manejadores de eventos.
 * @returns {React.JSX.Element} Elemento JSX renderizado.
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  multiplier,
  onOpenCalculator,
  onOpenShopifySync
}) => {
  const [imageError, setImageError] = useState<boolean>(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const selectedVariant: ProductVariant | undefined = product.variants?.[selectedVariantIndex];
  const financials = calculateFinancials(product, multiplier, undefined, undefined, selectedVariant);

  const getNicheColor = (niche: WinningProduct['niche']) => {
    switch (niche) {
      case 'Belleza':
        return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'Salud':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Seguridad/Tecnología':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group">
      {/* Fila Principal Horizontal */}
      <div className="flex flex-col lg:flex-row items-stretch">
        {/* Columna 1: Imagen y Badges (Izquierda) */}
        <div className="relative w-full lg:w-64 h-52 lg:h-auto min-h-[210px] bg-slate-100 overflow-hidden flex items-center justify-center shrink-0">
          {!imageError ? (
            <img
              src={product.productImage}
              alt={product.productName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-slate-400 gap-2">
              <Package className="h-10 w-10 text-slate-300" />
              <span className="text-[11px] font-semibold text-center line-clamp-2">{product.productNameEn}</span>
            </div>
          )}

          {/* Badges superiores izquierdos: Nicho y Almacén */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
            <span
              className={`px-2 py-0.5 rounded-lg text-xs font-bold border backdrop-blur-md shadow-sm ${getNicheColor(
                product.niche
              )}`}
            >
              {product.niche}
            </span>
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold backdrop-blur-md shadow-sm flex items-center gap-1 ${
                product.warehouseType === 'Europa'
                  ? 'bg-blue-600/90 text-white'
                  : 'bg-slate-900/80 text-white'
              }`}
            >
              {product.warehouseType === 'Europa' ? (
                <>
                  <Building2 className="h-3 w-3 text-amber-300" />
                  <span>{product.warehouseLocation}</span>
                </>
              ) : (
                <>
                  <Plane className="h-3 w-3 text-cyan-300" />
                  <span>Almacén Central (6-9d)</span>
                </>
              )}
            </span>
          </div>

          {/* Badges superiores derechos: Ver en CJ y Valor */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 items-end">
            <a
              href={product.cjUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Ver producto original en CJ Dropshipping"
              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-1 shadow-md transition-transform hover:scale-105"
            >
              <span>Ver en CJ</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-400 text-slate-950 flex items-center gap-1 shadow-sm">
              <Sparkles className="h-2.5 w-2.5 fill-slate-950" />
              {product.perceivedValue} Valor
            </span>
          </div>

          {/* Badge inferior de envío y alcance logístico */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2.5 py-1 rounded-lg bg-slate-900/85 text-white backdrop-blur-sm text-[11px] font-medium">
            <div className="flex items-center gap-1 text-cyan-300">
              <Truck className="h-3 w-3" />
              <span className="truncate max-w-[140px]">{product.deliveryDays}</span>
            </div>
            <span className="text-emerald-400 text-[10px] font-bold flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              IOSS Incluido
            </span>
          </div>
        </div>

        {/* Columna 2: Información Comercial & Variantes (Centro) */}
        <div className="p-4 lg:p-5 flex-1 flex flex-col justify-between space-y-3 min-w-0">
          <div>
            {/* Título del Producto */}
            <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-emerald-600 transition-colors">
              {product.productName}
            </h3>

            {/* Aviso de Alcance Geográfico de Mercado */}
            <div className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
              <MapPin className="h-3.5 w-3.5 text-blue-600 shrink-0" />
              <span>{product.targetMarketNotice}</span>
            </div>

            {/* Problema Resuelto */}
            <div className="mt-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-slate-900">Solución:</strong> {product.problemSolved}
                </p>
              </div>
            </div>

            {/* Selector de Variantes (si tiene más de 1) */}
            {product.variants && product.variants.length > 1 && (
              <div className="mt-2.5 p-2.5 rounded-xl bg-slate-100/80 border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
                  <span>Variante / Color Seleccionado:</span>
                  <span className="text-emerald-700 font-extrabold">
                    {formatCurrency(financials.sourcingCost)} CJ + {formatCurrency(financials.shippingCost)} Envío
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.variants.map((v, idx) => (
                    <button
                      key={v.vid || idx}
                      type="button"
                      onClick={() => setSelectedVariantIndex(idx)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                        selectedVariantIndex === idx
                          ? 'bg-slate-900 text-white shadow-sm ring-1 ring-emerald-500'
                          : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
                      }`}
                    >
                      {v.variantName} ({formatCurrency(v.variantPrice)})
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Botón Discreto para Desplegar / Ocultar Detalles */}
          <div>
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-bold transition border border-slate-200"
            >
              <span>{isExpanded ? 'Ocultar análisis y ángulos' : 'Ver análisis de competencia y ángulos de venta'}</span>
              {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Columna 3: Desglose Financiero & Acciones (Derecha) */}
        <div className="w-full lg:w-72 bg-slate-50/70 p-4 lg:p-5 border-t lg:border-t-0 lg:border-l border-slate-200/80 flex flex-col justify-between space-y-3 shrink-0">
          <div className="space-y-2.5">
            {/* Fila de Costes Base en CJ */}
            <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
              <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <div className="text-slate-400 text-[10px]">Coste CJ</div>
                <div className="font-bold text-slate-800 text-xs">{formatCurrency(financials.sourcingCost)}</div>
              </div>
              <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <div className="text-slate-400 text-[10px]">Portes</div>
                <div className="font-bold text-slate-800 text-xs">{formatCurrency(financials.shippingCost)}</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 text-white shadow-2xs">
                <div className="text-slate-300 text-[10px] font-semibold">Total COGS</div>
                <div className="font-bold text-xs">{formatCurrency(financials.cogs)}</div>
              </div>
            </div>

            {/* Caja Destacada de Venta y Beneficio Neto */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100/70 border border-emerald-200 shadow-2xs">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-700">
                  PVP Sugerido (x{multiplier}):
                </span>
                <span className="text-lg font-black text-slate-900">
                  {formatCurrency(financials.retailPrice)}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs pt-1.5 border-t border-emerald-200/80">
                <span className="text-emerald-800 font-semibold flex items-center gap-1 text-[11px]">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                  Beneficio Limpio (CAC ~9.5€):
                </span>
                <span className="text-sm font-black text-emerald-700">
                  +{formatCurrency(financials.netProfit)}
                </span>
              </div>

              <div className="flex justify-between items-center text-[11px] text-slate-600 mt-1">
                <span>Margen: <strong>{financials.profitMarginPercent}%</strong></span>
                <span>ROI: <strong className="text-emerald-700">+{financials.roiPercent}%</strong></span>
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => onOpenCalculator(product, selectedVariant)}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm"
            >
              <Calculator className="h-3.5 w-3.5 text-emerald-400" />
              <span>Simulador</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenShopifySync(product)}
              className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Exportar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Panel Inferior Colapsable de Ancho Completo */}
      {isExpanded && (
        <div className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 lg:p-5 space-y-3 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Columna 1: Estudio de Mercado y Competencia */}
            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-950 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <Store className="h-4 w-4 text-amber-700" />
                <span>Precios en Mercado (España):</span>
              </div>
              <div className="font-black text-amber-800 text-sm">{product.marketPriceRange}</div>
              <p className="text-xs text-amber-900/80 leading-relaxed">
                {product.competitorBenchmark}
              </p>
            </div>

            {/* Columna 2: Ángulos de Anuncios Ganadores */}
            <div className="p-3.5 rounded-xl bg-purple-50/80 border border-purple-200/80 text-purple-950 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <Megaphone className="h-4 w-4 text-purple-700" />
                <span>Ángulos de Anuncio (TikTok / Meta):</span>
              </div>
              {product.suggestedAngles && product.suggestedAngles.length > 0 ? (
                <ul className="space-y-1 text-xs text-purple-900/90 list-disc list-inside leading-snug">
                  {product.suggestedAngles.map((angle, idx) => (
                    <li key={idx}>{angle}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-purple-800">Enfoque en dolor agudo y demostración visual en vídeo.</p>
              )}
            </div>

            {/* Columna 3: Público Objetivo */}
            <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200/80 text-blue-950 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <Target className="h-4 w-4 text-blue-700" />
                <span>Público Objetivo & Segmentación:</span>
              </div>
              <p className="text-xs text-blue-900/90 leading-relaxed">
                {product.targetAudience || 'Compradores recurrentes de comercio electrónico.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
