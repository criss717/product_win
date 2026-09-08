import React from 'react';
import { WinningProduct } from '../types/product.types';
import { calculateFinancials, formatCurrency } from '../lib/financialCalculations';
import { Sparkles, ArrowRight, ShieldCheck, Award } from 'lucide-react';

interface ProfitComparisonTableProps {
  products: WinningProduct[];
  onSelectProduct: (product: WinningProduct) => void;
}

/**
 * Componente de tabla comparativa de rentabilidad x2 vs x3.
 * Permite visualizar el colchón de seguridad de gasto en Ads y el beneficio neto de cada producto del catálogo.
 *
 * @param {ProfitComparisonTableProps} props Catálogo de productos y selector de producto.
 * @returns {React.JSX.Element} Elemento JSX renderizado.
 */
export const ProfitComparisonTable: React.FC<ProfitComparisonTableProps> = ({
  products,
  onSelectProduct
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            <h2 className="text-xl font-black text-slate-900">
              Comparador de Rentabilidad: Escenario x2 vs Escenario x3
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Compara por qué un multiplicador x3 te da el margen de seguridad necesario para soportar subidas en costes de publicidad (Meta/TikTok).
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Producto</th>
              <th className="py-3 px-3">Coste COGS (CJ+Portes)</th>
              <th className="py-3 px-3 bg-slate-100/60 text-slate-900 text-center">PVP x2</th>
              <th className="py-3 px-3 bg-slate-100/60 text-emerald-700 text-center">Beneficio Neto x2</th>
              <th className="py-3 px-3 bg-emerald-50 text-slate-900 text-center">PVP x3 (Recomendado)</th>
              <th className="py-3 px-3 bg-emerald-50 text-emerald-700 text-center">Beneficio Neto x3</th>
              <th className="py-3 px-3 text-center">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => {
              const finX2 = calculateFinancials(product, 2);
              const finX3 = calculateFinancials(product, 3);

              return (
                <tr key={product.pid} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.productImage}
                        alt={product.productName}
                        className="h-10 w-10 rounded-lg object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-slate-900 line-clamp-1">{product.productName}</div>
                        <div className="text-[11px] text-slate-400">{product.niche} • {product.salesVolume} ventas</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-800">
                    {formatCurrency(finX3.cogs)}
                  </td>
                  <td className="py-3.5 px-3 bg-slate-50/50 font-bold text-center text-slate-900">
                    {formatCurrency(finX2.retailPrice)}
                  </td>
                  <td className="py-3.5 px-3 bg-slate-50/50 font-black text-center text-slate-800">
                    {formatCurrency(finX2.netProfit)}
                  </td>
                  <td className="py-3.5 px-3 bg-emerald-50/60 font-black text-center text-slate-900">
                    {formatCurrency(finX3.retailPrice)}
                  </td>
                  <td className="py-3.5 px-3 bg-emerald-50/60 font-black text-center text-emerald-600">
                    +{formatCurrency(finX3.netProfit)}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-emerald-600 text-white font-bold text-[11px] transition inline-flex items-center gap-1"
                    >
                      <span>Simular</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
