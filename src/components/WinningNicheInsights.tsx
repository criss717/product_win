import React from 'react';
import { HeartPulse, Smile, ShieldCheck, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

/**
 * Componente informativo con análisis estratégico de los 3 nichos ganadores y claves para vender en España.
 *
 * @returns {React.JSX.Element} Elemento JSX renderizado.
 */
export const WinningNicheInsights: React.FC = () => {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 space-y-6">
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-black">Guía Estratégica: ¿Por qué estos productos ganan en España?</h2>
          <p className="text-xs text-slate-400">
            Reglas de oro para dropshipping rentable con Shopify y CJ Dropshipping.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        {/* Nicho Belleza */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
          <div className="flex items-center space-x-2 text-pink-400 font-bold">
            <Smile className="h-5 w-5" />
            <span className="text-sm">Belleza & Cuidado Facial</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Efecto "Antes y Después" inmediato. Son productos virales en TikTok / Instagram Reels con compras impulsivas altas (ticket 24€-49€).
          </p>
          <div className="text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Fácil demostración visual en vídeo</span>
          </div>
        </div>

        {/* Nicho Salud */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold">
            <HeartPulse className="h-5 w-5" />
            <span className="text-sm">Salud, Dolor & Bienestar</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Resuelven dolores específicos (espalda, ronquidos, cervicales). La gente paga rápidamente si percibe que eliminará su molestia diaria.
          </p>
          <div className="text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Menor sensibilidad al precio (Alto valor percibido)</span>
          </div>
        </div>

        {/* Nicho Seguridad/Tecnología */}
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-sm">Seguridad & Privacidad Doméstica</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Venden tranquilidad emocional (vigilar mascotas, niños o casa sin cuotas). Productos pequeños con envío económico CJPacket.
          </p>
          <div className="text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Excelente margen x3 y baja tasa de devolución</span>
          </div>
        </div>
      </div>
    </div>
  );
};
