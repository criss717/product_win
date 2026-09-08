# 🌟 Product Star — Radar de Productos Ganadores & Calculadora D2C

> **Plataforma web analítica de alto rendimiento construida con Next.js 15, React 19 y TypeScript para auditar, filtrar y desplegar productos ganadores de CJ Dropshipping con logística optimizada a España y Europa.**

---

## 📑 Tabla de Contenidos

1. [Visión General del Producto](#-visión-general-del-producto)
2. [Características Principales](#-características-principales)
3. [Stack Tecnológico](#-stack-tecnológico)
4. [Estructura del Proyecto](#-estructura-del-proyecto)
5. [Modelos de Catálogo y Nichos Ganadores](#-modelos-de-catálogo-y-nichos-ganadores)
6. [Variables de Entorno y Seguridad](#-variables-de-entorno-y-seguridad)
7. [Instalación y Uso en Local](#-instalación-y-uso-en-local)
8. [Despliegue en Producción (Vercel)](#-despliegue-en-producción-vercel)
9. [Métricas Financieras y Fórmulas de Rentabilidad](#-métricas-financieras-y-fórmulas-de-rentabilidad)
10. [Licencia](#-licencia)

---

## 🎯 Visión General del Producto

**Product Star** es una solución especializada diseñada para erradicar el error más común en el comercio electrónico: lanzar campañas publicitarias a productos sin viabilidad financiera o con fricción logística.

La aplicación centraliza datos auditados al céntimo directamente desde el portal oficial de **CJ Dropshipping (API v2.0)**, permitiendo a los marketers y dueños de tiendas Shopify:
- Comparar instantáneamente márgenes brutos y netos bajo multiplicadores **x2** y **x3**.
- Desglosar con total transparencia los costes de producto y portes aduaneros (**IOSS** incluido).
- Identificar referencias con inventario local en **Europa (Alemania/Francia)** para ofrecer tiempos de entrega de **2 a 5 días hábiles**.
- Analizar ganchos de venta por impulso (*impulse-buying hooks*) y ángulos publicitarios validados.

---

## 🚀 Características Principales

### 1. 🗂️ Segmentación Multialmacén Inteligente
- **🇨🇳 Almacén China (25 Top Ganadores)**:
  - Fletes certificados a España vía **CJPacket Euro Sensitive** y **CJPacket Ordinary I** (8-18 días).
  - Impuestos de importación IOSS liquidados en origen, evitando retenciones en aduanas.
- **🇪🇺 Almacenes Europa (10 Top Ganadores)**:
  - Stock físico verificado en almacenes de Frankfurt/Alemania y Francia.
  - Envíos ultrarrápidos de **2 a 5 días vía DHL Paket**.
- **📦 Catálogo Base Histórico**:
  - Comparativa de 26 productos consolidados con variantes y costes sincronizados.

### 2. 💰 Simulador Financiero en Tiempo Real
- **Multiplicadores Dinámicos**: Conmuta entre **x2** y **x3** sobre el COGS con un solo clic.
- **Modal de Desglose Financiero (`MarginCalculatorModal`)**:
  - Coste de Proveedor (EUR).
  - Coste Logístico exacto por variante y peso volumétrico.
  - Estimación de CAC (Coste de Adquisición de Clientes) de equilibrio.
  - Beneficio neto proyectado y ROI publicitario.

### 3. 🎯 Nichos de Compra por Impulso
- **🐾 Cuidado y Seguridad de Seres Queridos**:
  - Cortauñas ergonómicos LED para mascotas (evitan cortar la vena viva).
  - Alarmas personales antipánico de 130 dB con sirena SOS para mujeres, niños y mayores.
  - Localizadores GPS inteligentes antipérdida (perros, gatos, niños, llaves).
- **💄 Estética & Belleza Facial**:
  - Masajeadores Gua Sha eléctricos con EMS y fototerapia LED.
  - Dispositivos tensores antiarrugas para cuello y rostro.
  - Kits de lifting de pestañas y cejas profesionales.
- **🩺 Salud & Bienestar**:
  - Cojines ortopédicos de tracción cervical y calor constante.
  - Masajeadores abdominales por infrarrojos y copas de ventosaterapia inteligente.

### 4. 🛍️ Exportación y Sincronización con Shopify (`ShopifySyncModal`)
- Generación de esquemas de producto listos para importar a Shopify con títulos persuasivos, variantes preconfiguradas e imágenes optimizadas en alta definición.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) | Renderizado híbrido SSR/SSG y optimización de rutas API |
| **Librería UI** | [React 19](https://react.dev/) | Interfaz reactiva con Server Components y Client Components |
| **Lenguaje** | [TypeScript 5.7](https://www.typescriptlang.org/) | Tipado estricto y prevención de errores en tiempo de compilación |
| **Estilos** | [Tailwind CSS 3.4](https://tailwindcss.com/) | Diseño responsivo moderno, paleta estética e interfaz oscura |
| **Iconografía** | [Lucide React](https://lucide.dev/) | Iconos vectoriales ligeros y consistentes |
| **Package Manager** | [pnpm](https://pnpm.io/) | Gestión eficiente y veloz de dependencias |

---

## 📂 Estructura del Proyecto

```
product_star/
├── src/
│   ├── app/                                 # Next.js App Router
│   │   ├── api/
│   │   │   └── products/
│   │   │       ├── live/route.ts            # Endpoint proxy server-side hacia la API de CJ
│   │   │       └── route.ts                 # Endpoint para servir catálogo local
│   │   ├── favicon.ico
│   │   ├── globals.css                      # Estilos globales y utilidades de Tailwind
│   │   ├── layout.tsx                       # Layout raíz de la aplicación con metadata
│   │   └── page.tsx                         # Dashboard interactivo principal
│   ├── components/                          # Componentes modulares de interfaz
│   │   ├── FilterBar.tsx                    # Filtros de búsqueda, nichos y almacenes
│   │   ├── Header.tsx                       # Barra superior con métricas y estado del sistema
│   │   ├── MarginCalculatorModal.tsx        # Calculadora detallada de rentabilidad por producto
│   │   ├── ProductCard.tsx                  # Tarjeta horizontal/vertical de producto ganador
│   │   ├── ProfitComparisonTable.tsx        # Comparador visual de retornos x2 vs x3
│   │   ├── ShopifySyncModal.tsx             # Modal de preparación y exportación a Shopify
│   │   └── WinningNicheInsights.tsx         # Tarjeta de análisis cualitativo y dolores resueltos
│   ├── data/                                # Datos auxiliares y pre-filtrados JSON
│   ├── lib/                                 # Lógica de negocio y catálogos maestros
│   │   ├── cjApiClient.ts                   # Cliente seguro para la API v2.0 de CJ Dropshipping
│   │   ├── cjCatalog.ts                     # Catálogo base histórico (26 productos)
│   │   └── cjOfficialCatalog.ts             # Catálogo maestro auditado oficial (35 productos)
│   └── types/                               # Definiciones de TypeScript
│       └── product.types.ts                 # Interfaces de productos, variantes y filtros
├── .env.local.example                       # Plantilla segura de variables de entorno
├── .gitignore                               # Reglas de exclusión de Git (protección de credenciales)
├── next.config.ts                           # Configuración de imágenes remotas y build de Next.js
├── package.json                             # Dependencias y scripts de ejecución
├── postcss.config.mjs                       # Configuración PostCSS para Tailwind
├── tailwind.config.ts                       # Tema, colores y extensiones de Tailwind
└── tsconfig.json                            # Configuración del compilador TypeScript
```

---

## 🔐 Variables de Entorno y Seguridad

### 1. Seguridad Server-Side
Las claves de la API de CJ Dropshipping **NO llevan el prefijo `NEXT_PUBLIC_`**. Esto garantiza que:
- Solo se ejecutan en el entorno seguro de Node.js en el servidor.
- **Nunca se exponen al navegador** ni se compilan en el bundle JavaScript del cliente.
- El frontend realiza consultas a `/api/products/live` y es esta ruta la que consulta a CJ en privado.

### 2. Configuración Local (`.env.local`)
Copia la plantilla de ejemplo y añade tus credenciales:

```bash
cp .env.local.example .env.local
```

Contenido del archivo `.env.local`:
```env
# Credenciales API v2.0 de CJ Dropshipping
CJ_EMAIL=tu_correo_registrado@ejemplo.com
CJ_API_KEY=tu_api_key_de_desarrollador
CJ_API_BASE_URL=https://developers.cjdropshipping.com/api2.0/v1

# Puerto local de desarrollo
PORT=3001
```

---

## 💻 Instalación y Uso en Local

### 1. Instalación de Dependencias
Asegúrate de estar en el directorio `product_star` y ejecuta:

```bash
pnpm install
```

### 2. Iniciar el Servidor de Desarrollo
```bash
pnpm dev
```
> La aplicación se iniciará en el puerto **`3001`** (para evitar colisiones con otros procesos locales):
> 👉 **[http://localhost:3001](http://localhost:3001)**

### 3. Compilación de Producción
Para validar que los tipos y rutas estáticas compilan sin errores:

```bash
pnpm build
pnpm start
```

---

## ☁️ Despliegue en Producción (Vercel)

Esta aplicación está 100% optimizada para desplegarse en **Vercel**:

1. Sube tu repositorio a GitHub / GitLab.
2. Inicia sesión en [Vercel](https://vercel.com/) y haz clic en **"Add New Project"**.
3. Selecciona el repositorio y define el **Root Directory** como `product_star` (si utilizas una estructura monorepo).
4. En la sección **Environment Variables**, añade las siguientes variables:

| Variable | Valor Recomendado | Entornos |
| :--- | :--- | :--- |
| `CJ_EMAIL` | Tu correo registrado en CJ | Production, Preview, Development |
| `CJ_API_KEY` | Tu API Key de CJ Developers | Production, Preview, Development |
| `CJ_API_BASE_URL` | `https://developers.cjdropshipping.com/api2.0/v1` | Production, Preview, Development |

5. Haz clic en **Deploy**. Vercel compilará la aplicación y generará una URL pública con certificado SSL automático.

---

## 📊 Métricas Financieras y Fórmulas de Rentabilidad

Cada tarjeta de producto implementa el siguiente modelo financiero:

$$\text{COGS (Cost of Goods Sold)} = \text{Coste del Producto (EUR)} + \text{Flete Certificado (EUR)}$$

$$\text{PVP Sugerido (x2)} = \text{COGS} \times 2 \qquad | \qquad \text{PVP Sugerido (x3)} = \text{COGS} \times 3$$

$$\text{Beneficio Limpio Estimado} = \text{PVP Sugerido} - \text{COGS} - \text{CAC Estimado}$$

* **IOSS Incluido**: Los productos de almacén China incluyen el IVA de importación dentro de la cotización de CJPacket, eliminando sobrecostes de aduanas para el comprador final en España.
* **Margen de Seguridad**: El multiplicador x3 está especialmente recomendado para absorber costes de tráfico pagado en Meta Ads y TikTok Ads manteniendo un ROI positivo.

---

## 📄 Licencia

Este software es de uso privado y comercial interno. Todos los derechos reservados.
