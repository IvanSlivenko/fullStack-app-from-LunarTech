// import config from "@/lib/config";
// import ImageKit from "imagekit";
// import { NextResponse } from "next/server";

// const {env: {imageKit: {publicKey, privateKey, urlEndpoint }}} = config;

// const imagekit = new ImageKit({
//     publicKey,
//     privateKey,
//     urlEndpoint,
// });

// export async function GET(){
//     return NextResponse.json(imagekit.getAuthenticationParameters());
// }

import config from "@/lib/config";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const {
  env: {
    imageKit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

// Масив дозволених доменів з .env
const allowedOrigins =
  process.env.ALLOWED_ORIGINS?.split(",").map((o) => o.trim()) ?? [
    "http://localhost:3000",
    "https://full-stack-app-from-lunar-tech.vercel.app",
  ];

// Перевірка, чи дозволений origin
function getCorsOrigin(origin: string | null): string | null {
  if (!origin) {console.log("origin немає");
    return null;}
     

  const cleanOrigin = origin.trim().toLowerCase();

  // Автоматично дозволяємо ВСІ subdomain *.vercel.app
  if (cleanOrigin.endsWith(".vercel.app")) {
    console.log("✅ Дозволено preview Vercel:", cleanOrigin);
    return cleanOrigin;
  }

  // Якщо origin у списку з .env
  if (allowedOrigins.some((o) => cleanOrigin.startsWith(o.toLowerCase()))) {
    console.log("✅ Дозволено з .env:", cleanOrigin);
    return cleanOrigin;
  }

  console.warn("❌ Заблокований origin:", cleanOrigin);
  return null;
}

// Формування заголовків CORS
function createCorsHeaders(origin: string | null): Headers {
  const headers = new Headers({
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "true",
    "Vary": "Origin",
  });

  const allowedOrigin = getCorsOrigin(origin);

  // Встановлюємо тільки якщо є значення
  if (allowedOrigin && allowedOrigin.length > 0) {
    headers.set("Access-Control-Allow-Origin", allowedOrigin);
  }

  return headers;
}

export async function GET(request: Request) {
  const origin = request.headers.get("origin");
  const headers = createCorsHeaders(origin);

  const authParams = imagekit.getAuthenticationParameters();

  return new NextResponse(JSON.stringify(authParams), {
    status: 200,
    headers: {
      ...Object.fromEntries(headers.entries()),
      "Content-Type": "application/json",
    },
  });
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");
  const headers = createCorsHeaders(origin);

  headers.set("Access-Control-Max-Age", "86400"); // кеш preflight на 24 години

  return new NextResponse(null, {
    status: 204,
    headers,
  });
}








