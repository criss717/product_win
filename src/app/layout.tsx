import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ProductStar • Radar de Productos Ganadores CJ Dropshipping & Shopify España',
  description: 'Plataforma interactiva para selección y análisis financiero de productos ganadores en los nichos de Salud, Belleza y Seguridad tecnológica.'
};

/**
 * Layout principal de la aplicación Next.js.
 *
 * @param {object} props Propiedades del componente layout.
 * @param {React.ReactNode} props.children Contenido hijo renderizado.
 * @returns {React.JSX.Element}
 */
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full bg-slate-900">
      <body className="min-h-full bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
