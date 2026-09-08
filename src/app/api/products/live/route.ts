import { NextRequest, NextResponse } from 'next/server';
import { cjLiveService } from '../../../../lib/cjApiClient';

export const dynamic = 'force-dynamic';

/**
 * Endpoint GET para consultar el catálogo de CJ Dropshipping en tiempo real.
 *
 * @param {NextRequest} request Solicitud HTTP con parámetros de búsqueda.
 * @returns {Promise<NextResponse>} Listado de productos obtenidos en vivo de CJ.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;
  const keyword = searchParams.get('keyword') || '';
  const niche = searchParams.get('niche') || 'Todos';
  const minPrice = parseFloat(searchParams.get('minPrice') || '5');
  const maxPrice = parseFloat(searchParams.get('maxPrice') || '30');

  try {
    const liveProducts = await cjLiveService.searchLiveProducts({
      keyword,
      niche,
      minPrice,
      maxPrice,
      size: 20
    });

    return NextResponse.json({
      success: true,
      mode: 'live_api',
      total: liveProducts.length,
      data: liveProducts
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Error al consultar API en vivo';
    return NextResponse.json(
      {
        success: false,
        error: errorMsg,
        data: []
      },
      { status: 500 }
    );
  }
}
