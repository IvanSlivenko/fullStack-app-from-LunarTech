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

// ------------------------------------------------------------------------------------- var 2
// import config from "@/lib/config";
// import ImageKit from "imagekit";
// import { NextResponse } from "next/server";

// const {
//   env: {
//     imageKit: { publicKey, privateKey, urlEndpoint },
//   },
// } = config;

// const imagekit = new ImageKit({
//   publicKey,
//   privateKey,
//   urlEndpoint,
// });

// // Масив дозволених доменів з .env
// const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",").map((o) =>
//   o.trim().toLowerCase()
// ) ?? ["http://localhost:3000", "https://full-stack-app-from-lunar-tech.vercel.app"];

// // Функція визначає допустимий origin
// function getCorsOrigin(origin: string | null): string | null {
//   if (!origin) return null; // same-origin запит, CORS не потрібен

//   try {
//     const url = new URL(origin);
//     const hostname = url.hostname.toLowerCase();

//     // Всі preview-деплоя Vercel дозволені
//     if (hostname.endsWith(".vercel.app")) {
//       console.log("✅ Дозволено Vercel preview:", origin);
//       return url.origin;
//     }

//     // Дозволені origin з .env
//     if (allowedOrigins.includes(url.origin.toLowerCase())) {
//       console.log("✅ Дозволено з .env:", origin);
//       return url.origin;
//     }

//   } catch (e) {
//     console.warn("❌ Невірний origin:", origin);
//     return null;
//   }

//   console.warn("❌ Заблокований origin:", origin);
//   return null;
// }

// // Створюємо CORS-заголовки
// function createCorsHeaders(origin: string | null): Headers {
//   const headers = new Headers({
//     "Access-Control-Allow-Methods": "GET, OPTIONS",
//     "Access-Control-Allow-Headers": "Content-Type",
//     "Access-Control-Allow-Credentials": "true",
//     Vary: "Origin",
//   });

//   const allowedOrigin = getCorsOrigin(origin);
//   console.log("allowedOrigin для CORS:", allowedOrigin);

//   if (allowedOrigin) {
//     headers.set("Access-Control-Allow-Origin", allowedOrigin);
//   }

//   return headers;
// }

// // GET — повертає параметри автентифікації ImageKit
// export async function GET(request: Request) {
//   const origin = request.headers.get("origin");
//   const headers = createCorsHeaders(origin);

//   const authParams = imagekit.getAuthenticationParameters();

//   return new NextResponse(JSON.stringify(authParams), {
//     status: 200,
//     headers: {
//       ...Object.fromEntries(headers.entries()),
//       "Content-Type": "application/json",
//       "X-Debug-Origin": origin || "no-origin",
//     },
//   });
// }

// // OPTIONS — preflight-запит
// export async function OPTIONS(request: Request) {
//   const origin = request.headers.get("origin");
//   const headers = createCorsHeaders(origin);

//   headers.set("Access-Control-Max-Age", "86400"); // кеш preflight на 24 години

//   return new NextResponse(null, {
//     status: 204,
//     headers,
//   });
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

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",").map((o) =>
  o.trim().toLowerCase()
) ?? [
  "http://localhost:3000",
  "https://full-stack-app-from-lunar-tech.vercel.app",
];

function getCorsOrigin(origin: string | null): string | null {
  if (!origin) return null; // same-origin, CORS не потрібен

  try {
    const url = new URL(origin);
    const hostname = url.hostname.toLowerCase();

    if (hostname.endsWith(".vercel.app")) {
      console.log("✅ Дозволено Vercel preview:", origin);
      return url.origin;
    }

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

function createCorsHeaders(origin: string | null): Headers {
  const headers = new Headers({
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "true",
    Vary: "Origin",
  });

  const allowedOrigin = getCorsOrigin(origin);

  console.log(" getCorsOrigin --------------------------------------------- allowedOrigin", allowedOrigin);

  if (allowedOrigin) {
    headers.set("Access-Control-Allow-Origin", allowedOrigin);
  }

  return headers;
}

// ------------------------------------------------------------------------------- GET 1
// export async function GET(request: Request) {

//   const origin = request.headers.get("origin");

//   console.log(" GET --------------------------------------------- origin", origin);
//   const headers = createCorsHeaders(origin);
//   console.log(" GET --------------------------------------------- headers", headers);

//   const authParams = imagekit.getAuthenticationParameters();

//   return new NextResponse(JSON.stringify(authParams), {
//     status: 200,
//     headers: {
//       ...Object.fromEntries(headers.entries()),
//       "Content-Type": "application/json",
//       "X-Debug-Origin": origin || "no-origin",
//     },
//   });
// }

// --------------------------------------------------------------------------------- GET 2
// export async function GET(request: Request) {
//   const origin = request.headers.get("origin");
//   console.log(" GET --------------------------------------------- origin", origin);
//   const allowedOrigin = getCorsOrigin(origin);

//   console.log(" GET --------------------------------------------- allowedOrigin", allowedOrigin);

//   const authParams = imagekit.getAuthenticationParameters();

//   return new NextResponse(JSON.stringify(authParams), {
//     status: 200,
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Credentials": "true",
//       "Access-Control-Allow-Methods": "GET, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type",
//       "Access-Control-Allow-Origin": allowedOrigin || "",
//       "Vary": "Origin",
//       "X-Debug-Origin": origin || "no-origin",
//     },
//   });
// }

// --------------------------------------------------------------------------------- GET 3

export async function GET(request: Request) {
  const origin = request.headers.get("origin");
  console.log("GET origin:", origin);

  const allowedOrigin = getCorsOrigin(origin);
  console.log("GET allowedOrigin:", allowedOrigin);

  const authParams = imagekit.getAuthenticationParameters();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
    "X-Debug-Origin": origin || "no-origin",
    ...(allowedOrigin ? { "Access-Control-Allow-Origin": allowedOrigin } : {}),
  };

  return new NextResponse(JSON.stringify(authParams), {
    status: 200,
    headers,
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
