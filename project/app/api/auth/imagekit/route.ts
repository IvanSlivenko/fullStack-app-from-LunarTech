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

const allowedOrigins =
  process.env.ALLOWED_ORIGINS?.split(",").map((o) => o.trim().toLowerCase()) ?? [
    "http://localhost:3000",
    "https://full-stack-app-from-lunar-tech.vercel.app",
  ];

// ------------------ CORS ------------------
function getCorsOrigin(origin: string | null): string | null {
  if (!origin) return null;

  try {
    const url = new URL(origin);
    const hostname = url.hostname.toLowerCase();

    // ✅ Будь-який Vercel preview або production
    if (hostname.endsWith(".vercel.app")) {
      console.log("✅ Дозволено Vercel preview:", origin);
      return url.origin;
    }

    // ✅ Додаткові дозволені origins з .env
    if (allowedOrigins.includes(url.origin.toLowerCase())) {
      console.log("✅ Дозволено з .env:", origin);
      return url.origin;
    }
  } catch (e) {
    console.warn("❌ Невірний origin:", origin);
    return null;
  }

  console.warn("❌ Заблокований origin:", origin);
  return null;
}

function createCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = getCorsOrigin(origin);

  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "true",
    "Vary": "Origin",
  };

  if (allowedOrigin) headers["Access-Control-Allow-Origin"] = allowedOrigin;

  return headers;
}

// ------------------ API Handlers ------------------
export async function GET(request: Request) {
  const origin = request.headers.get("origin");
  const headers = createCorsHeaders(origin);

  const authParams = imagekit.getAuthenticationParameters();

  return new NextResponse(JSON.stringify(authParams), {
    status: 200,
    headers: {
      ...headers,
      "Content-Type": "application/json",
      "X-Debug-Origin": origin || "no-origin",
    },
  });
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");
  const headers = createCorsHeaders(origin);

  headers["Access-Control-Max-Age"] = "86400"; // кеш preflight 24 години

  return new NextResponse(null, {
    status: 204,
    headers,
  });
}

