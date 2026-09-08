'use client';

import React, { useState } from 'react';
import { WinningProduct } from '../types/product.types';
import { calculateFinancials, formatCurrency } from '../lib/financialCalculations';
import {
  X,
  ShoppingBag,
  Copy,
  Check,
  Download,
  ExternalLink,
  Tag,
  PackageCheck
} from 'lucide-react';

interface ShopifySyncModalProps {
  product: WinningProduct;
  onClose: () => void;
}

/**
 * Modal para sincronización, exportación a formato Shopify CSV y copia de textos y precios optimizados.
 *
 * @param {ShopifySyncModalProps} props Producto seleccionado y función de cierre del modal.
 * @returns {React.JSX.Element} Elemento JSX renderizado.
 */
export const ShopifySyncModal: React.FC<ShopifySyncModalProps> = ({
  product,
  onClose
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const finX3 = calculateFinancials(product, 3);

  const copyToClipboard = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  /**
   * Genera y descarga el archivo CSV estándar compatible con la importación directa de productos en Shopify.
   */
  const handleDownloadShopifyCsv = () => {
    const headers = [
      'Handle',
      'Title',
      'Body (HTML)',
      'Vendor',
      'Standardized Product Type',
      'Custom Product Type',
      'Tags',
      'Published',
      'Option1 Name',
      'Option1 Value',
      'Variant SKU',
      'Variant Grams',
      'Variant Inventory Tracker',
      'Variant Inventory Qty',
      'Variant Inventory Policy',
      'Variant Fulfillment Service',
      'Variant Price',
      'Variant Compare At Price',
      'Variant Requires Shipping',
      'Variant Taxable',
      'Image Src',
      'Image Position',
      'Image Alt Text',
      'Gift Card',
      'SEO Title',
      'SEO Description',
      'Status'
    ];

    const handle = product.productName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const bodyHtml = `
      <h2>${product.productName}</h2>
      <p><strong>${product.problemSolved}</strong></p>
      <p>${product.description}</p>
      <h3>Beneficios Principales:</h3>
      <ul>
        ${product.suggestedAngles.map((angle) => `<li>${angle}</li>`).join('')}
      </ul>
      <p><em>Envío rápido con seguimiento asegurado para España (6-9 días laborables).</em></p>
    `.trim().replace(/\n\s+/g, ' ');

    const rows = product.variants.map((variant, index) => [
      handle,
      product.productName,
      `"${bodyHtml.replace(/"/g, '""')}"`,
      'ProductStar Dropshipping',
      product.categoryName,
      product.niche,
      `"Ganador, ${product.niche}, Alta Demanda, Envio Rapido"`,
      'TRUE',
      'Modelo',
      variant.variantName,
      variant.variantSku,
      variant.variantWeight,
      'shopify',
      variant.inventory || 100,
      'deny',
      'manual',
      finX3.retailPrice.toFixed(2),
      (finX3.retailPrice * 1.35).toFixed(2), // Precio tachado de oferta
      'TRUE',
      'TRUE',
      product.productImage,
      index + 1,
      product.productName,
      'FALSE',
      `"${product.productName} - Envío Rápido España"`,
      `"${product.problemSolved}"`,
      'active'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `shopify_product_${product.productSku}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Cabecera del Modal */}
        <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex justify-between items-center z-10">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Sincronización con Tienda Shopify
              </h2>
              <p className="text-xs text-slate-500 line-clamp-1">{product.productName}</p>
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

        <div className="p-6 sm:p-8 space-y-6">
          {/* Tarjeta de Resumen de Exportación */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-200 space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm">
                <PackageCheck className="h-4 w-4 text-emerald-600" />
                <span>Listo para Importar en Shopify España</span>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-200/60 text-emerald-900">
                CSV Estándar 2026
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Descarga el archivo CSV preconfigurado con títulos optimizados para conversión, precios recomendados x3 (<strong>{formatCurrency(finX3.retailPrice)}</strong>), precio de oferta tachado, descripciones persuasivas y tags automáticos.
            </p>

            <button
              type="button"
              onClick={handleDownloadShopifyCsv}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
            >
              <Download className="h-4 w-4" />
              <span>Descargar Shopify Product CSV (.csv)</span>
            </button>
          </div>

          {/* Guía de Importación Paso a Paso en Shopify */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Pasos para conectar en tu panel de Shopify:
            </h4>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <li>Entra a tu panel de administración en <strong>Shopify &gt; Productos</strong>.</li>
              <li>Haz clic en el botón <strong>Importar</strong> (esquina superior derecha).</li>
              <li>Selecciona el archivo CSV descargado y pulsa <strong>Subir y previsualizar</strong>.</li>
              <li>En la app de <strong>CJ Dropshipping en Shopify</strong>, busca el SKU <code className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">{product.productSku}</code> y haz clic en <strong>Conectar (Link Product)</strong> para automatizar los pedidos y envíos.</li>
            </ol>
          </div>

          {/* Bloques de Copia Rápida */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5 text-emerald-600" />
              Copiar Textos y Creativos al Portapapeles:
            </h4>

            {/* Título de Producto */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
              <div className="pr-4">
                <span className="text-[11px] text-slate-400 font-semibold block">Título Optimizado:</span>
                <span className="text-slate-800 font-bold">{product.productName}</span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(product.productName, 'title')}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200 font-bold text-xs flex items-center gap-1 shrink-0 transition"
              >
                {copiedSection === 'title' ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                <span>{copiedSection === 'title' ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>

            {/* Ángulos de Venta para Anuncios */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-slate-400 font-semibold">Ganchos (Hooks) para Anuncios de Meta/TikTok:</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(product.suggestedAngles.join('\n• '), 'hooks')}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200 font-bold text-xs flex items-center gap-1 shrink-0 transition"
                >
                  {copiedSection === 'hooks' ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedSection === 'hooks' ? 'Copiados' : 'Copiar'}</span>
                </button>
              </div>
              <ul className="text-slate-700 space-y-1 text-xs">
                {product.suggestedAngles.map((angle, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{angle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
