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

// Перевіряємо, чи домен дозволений
function getCorsOrigin(origin: string | null): string | null {
  if (!origin) return null; // Якщо немає origin, не дозволяємо доступ

  // Дозволяємо всі піддомени для цього проєкту
  if (origin.startsWith("https://full-stack-app-from-lunar-tech")) {
    return origin; // Повертаємо допустимий origin
  }

  return null; // Якщо домен не дозволений, повертаємо null
}

// Створення заголовків CORS
function createCorsHeaders(origin: string | null): Headers {
  const headers = new Headers({
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  const allowedOrigin = getCorsOrigin(origin);

  // Якщо origin дозволений, встановлюємо заголовок
  if (allowedOrigin) {
    headers.set("Access-Control-Allow-Origin", allowedOrigin);
  }

  return headers;
}

export async function GET(request: Request) {
  const origin = request.headers.get("origin"); // Отримуємо origin запиту
  const headers = createCorsHeaders(origin); // Створюємо CORS заголовки

  const authParams = imagekit.getAuthenticationParameters(); // Параметри автентифікації

  return new NextResponse(JSON.stringify(authParams), {
    status: 200,
    headers, // Додаємо заголовки до відповіді
  });
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");
  const headers = createCorsHeaders(origin); // Створюємо заголовки для preflight запиту

  return new NextResponse(null, {
    status: 204, // Повертаємо статус 204 (No Content)
    headers, // Додаємо заголовки
  });
}




