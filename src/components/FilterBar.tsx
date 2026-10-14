import React from 'react';
import { Search, SlidersHorizontal, Sparkles, HeartPulse, Smile, ShieldCheck, RefreshCw, Building2, Plane, Globe } from 'lucide-react';
import { NicheCategory, WarehouseFilter, ProductFilterState } from '../types/product.types';

interface FilterBarProps {
  filters: ProductFilterState;
  onFilterChange: (newFilters: Partial<ProductFilterState>) => void;
  productCount: number;
  isSyncing: boolean;
  onSyncWithCJ: () => void;
  lastSyncTime: string | null;
}

/**
 * Componente de barra de filtros interactiva con conmutadores de nichos, almacenes geográficos
 * y multiplicadores de precio x2/x3.
 *
 * @param {FilterBarProps} props Propiedades de filtrado y sincronización.
 * @returns {React.JSX.Element} Elemento JSX renderizado.
 */
export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  productCount,
  isSyncing,
  onSyncWithCJ,
  lastSyncTime
}) => {
  const niches: { id: NicheCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'Todos', label: 'Todos los Nichos', icon: Sparkles },
    { id: 'Belleza', label: 'Belleza & Estética', icon: Smile },
    { id: 'Salud', label: 'Salud & Bienestar', icon: HeartPulse },
    { id: 'Seguridad/Tecnología', label: 'Seguridad & Tech', icon: ShieldCheck }
  ];

  const warehouses: { id: WarehouseFilter; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'Todos', label: 'Todos los Almacenes', icon: Globe },
    { id: 'China (Nuevo MCP)', label: '🇨🇳 Almacén China (Nuevo MCP • 25 Top)', icon: Plane },
    { id: 'Europa (Nuevo MCP)', label: '🇪🇺 Almacenes Europa (Nuevo MCP • 10 Top)', icon: Building2 },
    { id: 'China (Global 6-9d)', label: '🇨🇳 Almacén China (Catálogo Base)', icon: Plane },
    { id: 'Almacenes Locales Europa', label: '🇪🇺 Almacenes Europa (Catálogo Base)', icon: Building2 }
  ];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 mb-8 space-y-4">
      {/* Barra de Estado y Sincronización con CJ */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3.5 rounded-xl bg-slate-900 text-white">
        <div className="flex items-center space-x-3">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Radar Oficial CJ Dropshipping MCP × Shopify España
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md font-semibold">
                IOSS & IVA Incluido en Origen
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Productos con stock confirmado, variantes y delimitación geográfica de envío a España y Europa.
              {lastSyncTime && ` (Sincronizado: ${lastSyncTime})`}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onSyncWithCJ}
          disabled={isSyncing}
          className="self-end sm:self-auto px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm shrink-0"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Verificando con CJ...' : 'Sincronizar con CJ'}</span>
        </button>
      </div>

      {/* Selector de Almacén de Origen */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs font-bold text-slate-700 mr-1">Filtrar por Procedencia:</span>
        {warehouses.map((wh) => {
          const Icon = wh.icon;
          const isSelected = filters.selectedWarehouse === wh.id;
          return (
            <button
              key={wh.id}
              type="button"
              onClick={() => onFilterChange({ selectedWarehouse: wh.id })}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{wh.label}</span>
            </button>
          );
        })}
      </div>

      {/* Fila 1: Búsqueda y Multiplicador */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center pt-2 border-t border-slate-100">
        {/* Barra de búsqueda */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por problema, nombre o ángulo publicitario..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm text-slate-800 placeholder-slate-400 transition"
          />
        </div>

        {/* Selector de Multiplicador x2 / x3 */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 self-start md:self-auto">
          <span className="text-xs font-semibold text-slate-500 px-2 flex items-center gap-1">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Estrategia de Precio:
          </span>
          <button
            type="button"
            onClick={() => onFilterChange({ multiplier: 2 })}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filters.multiplier === 2
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Multiplicador x2
          </button>
          <button
            type="button"
            onClick={() => onFilterChange({ multiplier: 3 })}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filters.multiplier === 3
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Multiplicador x3
          </button>
        </div>
      </div>

      {/* Fila 2: Pestañas de Nicho y Ordenación */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center pt-2 border-t border-slate-100">
        {/* Pestañas de nichos */}
        <div className="flex flex-wrap gap-2">
          {niches.map((niche) => {
            const Icon = niche.icon;
            const isSelected = filters.selectedNiche === niche.id;
            return (
              <button
                key={niche.id}
                type="button"
                onClick={() => onFilterChange({ selectedNiche: niche.id })}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{niche.label}</span>
              </button>
            );
          })}
        </div>

        {/* Contador de Productos y Ordenación */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-xs text-slate-500 font-medium">
            Mostrando <strong className="text-slate-900">{productCount}</strong> productos ganadores
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium">Ordenar:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as ProductFilterState['sortBy'] })}
              className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-slate-400 cursor-pointer"
            >
              <option value="salesVolume">Ventas / Popularidad</option>
              <option value="netProfit">Mayor Beneficio Neto</option>
              <option value="roi">Mayor ROI %</option>
              <option value="sourcingCost">Menor Coste Base</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
