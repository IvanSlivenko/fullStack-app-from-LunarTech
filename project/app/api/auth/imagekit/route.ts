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

function getCorsOrigin(origin: string | null): string | null {
  if (!origin) return null;

  // Дозволяємо всі піддомени для цього проєкту
  if (origin.startsWith("https://full-stack-app-from-lunar-tech")) {
    return origin;
  }

  return null; // Якщо домен не дозволений — повертаємо null
}

function createCorsHeaders(origin: string | null): Headers {
  const headers = new Headers({
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  const allowedOrigin = getCorsOrigin(origin);

  if (allowedOrigin) {
    headers.set("Access-Control-Allow-Origin", allowedOrigin); // Додаємо дозволений Origin
  } else {
    // Якщо домен не дозволений, не ставимо заголовок
    headers.set("Access-Control-Allow-Origin", ""); // не порожній заголовок
  }

  return headers;
}

export async function GET(request: Request) {
  const origin = request.headers.get("origin");
  const headers = createCorsHeaders(origin);

  const authParams = imagekit.getAuthenticationParameters();

  return new NextResponse(JSON.stringify(authParams), {
    status: 200,
    headers,
  });
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");
  const headers = createCorsHeaders(origin);

  return new NextResponse(null, {
    status: 204,
    headers,
  });
}


