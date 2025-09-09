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

function getCorsOrigin(origin: string | null) {
  if (!origin) return "";

  // Дозволяємо всі піддомени vercel з цим проєктом
  if (origin.startsWith("https://full-stack-app-from-lunar-tech")) {
    return origin;
  }

  return "";
}

export async function GET(request: Request) {
  const origin = request.headers.get("origin");
  const corsOrigin = getCorsOrigin(origin);

  const headers = new Headers({
    "Access-Control-Allow-Origin": corsOrigin || "*", // 👈 fallback to "*" if needed
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  const authParams = imagekit.getAuthenticationParameters();
  return new NextResponse(JSON.stringify(authParams), {
    status: 200,
    headers,
  });
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");
  const corsOrigin = getCorsOrigin(origin);

  const headers = new Headers({
    "Access-Control-Allow-Origin": corsOrigin || "*", // 👈 fallback to "*" if needed
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  return new NextResponse(null, {
    status: 204,
    headers,
  });
}

