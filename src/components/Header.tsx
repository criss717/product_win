import React from 'react';
import { ShoppingBag, TrendingUp, Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface HeaderProps {
  totalWinningProducts: number;
  averageRoi: number;
}

/**
 * Componente de cabecera principal del dashboard de productos ganadores.
 * Muestra el branding, indicadores clave de rendimiento (KPIs) y estado del catálogo para España.
 *
 * @param {HeaderProps} props Propiedades que contienen el conteo de productos y ROI medio.
 * @returns {React.JSX.Element} Elemento JSX renderizado.
 */
export const Header: React.FC<HeaderProps> = ({ totalWinningProducts, averageRoi }) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo y título */}
          <div className="flex items-center space-x-3">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <ShoppingBag className="h-6 w-6 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-black tracking-tight text-white">
                  PRODUCT<span className="text-emerald-400">STAR</span>
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  CJ × Shopify España
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Radar de Productos Ganadores • Salud, Belleza & Seguridad
              </p>
            </div>
          </div>

          {/* Métricas destacadas en cabecera */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-3 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <div className="text-left">
                <div className="text-xs text-slate-400">Catálogo Ganador</div>
                <div className="text-sm font-bold text-white">{totalWinningProducts} Productos Top</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <div className="text-left">
                <div className="text-xs text-slate-400">ROI Promedio x3</div>
                <div className="text-sm font-bold text-emerald-400">+{averageRoi}% Neto</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <Zap className="h-4 w-4 text-cyan-400" />
              <div className="text-left">
                <div className="text-xs text-slate-400">Envíos a España</div>
                <div className="text-sm font-bold text-cyan-300">6-10 Días CJ Packet</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
