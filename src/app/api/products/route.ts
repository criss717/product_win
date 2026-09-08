import { NextRequest, NextResponse } from 'next/server';
import { winningProductsCatalog } from '../../../lib/cjCatalog';
import { NicheCategory } from '../../../types/product.types';

export const dynamic = 'force-dynamic';

/**
 * Controlador GET para la ruta de API de productos.
 * Permite filtrar por nicho, rango de precios y búsqueda textual.
 *
 * @param {NextRequest} request Solicitud HTTP con parámetros de búsqueda.
 * @returns {Promise<NextResponse>} Respuesta JSON con el listado de productos filtrados.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;
  const niche = searchParams.get('niche') as NicheCategory | null;
  const keyword = searchParams.get('keyword')?.toLowerCase() || '';
  const minPrice = parseFloat(searchParams.get('minPrice') || '0');
  const maxPrice = parseFloat(searchParams.get('maxPrice') || '999');

  let filtered = [...winningProductsCatalog];

  if (niche && niche !== 'Todos') {
    filtered = filtered.filter((item) => item.niche === niche);
  }

  if (keyword.trim()) {
    filtered = filtered.filter(
      (item) =>
        item.productName.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        item.problemSolved.toLowerCase().includes(keyword)
    );
  }

  filtered = filtered.filter((item) => item.sellPrice >= minPrice && item.sellPrice <= maxPrice);

  return NextResponse.json({
    success: true,
    total: filtered.length,
    data: filtered
  });
}
