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

// Цей роут обробляє GET-запит
export async function GET(request: Request) {
  const origin = request.headers.get("origin");

  const allowedOrigins = [
    "https://full-stack-app-from-lunar-tech.vercel.app",
    "https://full-stack-app-from-lunar-tech-4xgr6w4kb.vercel.app"
  ];

  const corsOrigin = allowedOrigins.includes(origin ?? "") ? origin : "";

  const authParams = imagekit.getAuthenticationParameters();

  const response = NextResponse.json(authParams);
  response.headers.set("Access-Control-Allow-Origin", corsOrigin);
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return response;
}

// Цей роут обробляє preflight-запит (OPTIONS)
export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");

  const allowedOrigins = [
    "https://full-stack-app-from-lunar-tech.vercel.app",
    "https://full-stack-app-from-lunar-tech-4xgr6w4kb.vercel.app"
  ];

  const corsOrigin = allowedOrigins.includes(origin ?? "") ? origin : "";

  const response = new NextResponse(null, { status: 204 });
  response.headers.set("Access-Control-Allow-Origin", corsOrigin);
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return response;
}
