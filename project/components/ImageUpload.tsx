// "use client";

// import React, { useRef, useState } from "react";
// // import { Image, Video, ImageKitProvider, upload ,ImageKitContext } from '@imagekit/next';
// // import { Image, Video, ImageKitProvider } from "@imagekit/next";
// import { ImageKitProvider, IKUpload, IKImage } from "imagekitio-next";
// import config from "@/lib/config";
// import ImageKit from "imagekit";
// import { ur } from "zod/v4/locales";
// import NextImage from "next/image";
// import { Button } from "./ui/button";
// import { error } from "console";

// import { toast } from "sonner";

// const {
//   env: {
//     imageKit: { publicKey, urlEndpoint },
//   },
// } = config;

// const getApiUrl = () => {
//   if (typeof window === "undefined") {
//     // Якщо код виконується на сервері (SSR)
//     return process.env.NEXT_PUBLIC_API_ENDPOINT_2; // production / preview
//   }

//   // Якщо на клієнті
//   const hostname = window.location.hostname;

//   if (hostname === "localhost") {
//     return ""; // відносний шлях, щоб використовувати /api/... без CORS
//   } else {
//     return process.env.NEXT_PUBLIC_API_ENDPOINT_2; // Vercel
//   }
// };


// const authenticator = async () => {
//   try {
//     const API_URL = getApiUrl();
//     const response = await fetch(`${API_URL}/api/auth/imagekit`, {
//       credentials: "include", // якщо потрібні куки
//     });
//     // const response = await fetch(`${config.env.apiEndpoint_2}/api/auth/imagekit`);
//     // const response = await fetch("/api/auth/imagekit");
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Request failed wit status ${response.status}:
//         ${errorText}`);
//     }
//     const data = await response.json();
//     const { signature, expire, token } = data;
//     return { token, expire, signature };
//   } catch (error: any) {
//     throw new Error(`Authentication request failed ${error.message}`);
//   }
// };

// const ImageUpload = ({
//   onFileChange,
// }: {
//   onFileChange: (filePath: string) => void;
// }) => {
//   const ikUploadRef = useRef(null);
//   const [file, setFile] = useState<{ filePath: string } | null>(null);

//   const OnError = (error: any, res: any) => {
//     console.log(error);
//     toast("Image ulpoaded failed", {
//       description: `Your image could not be upload. Please try again`,
//       // variant: "destructive"
//     });
//   };

//   const OnSuccess = (res: any) => {
//     setFile(res);
//     onFileChange(res.filePath);

//     toast("Image ulpoaded succefull", {
//       description: `${res.filePath} uploaded successfully`,
//     });
//   };

//   return (
//     <ImageKitProvider
//       publicKey={publicKey}
//       urlEndpoint={urlEndpoint}
//       authenticator={authenticator}
//     >
//       <IKUpload
//         className="hidden"
//         ref={ikUploadRef}
//         onError={OnError}
//         onSuccess={OnSuccess}
//         // fileName="/images/excavator.jpeg"
//         fileName={`upload_${Date.now()}.jpg`}
//       />
//       <Button
//         className="w-full flex items-center gap-2 border border-gray-100 rounded-md px-3 py-2 text-white cursor-pointer hover:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
//         onClick={(e) => {
//           e.preventDefault();
//           if (ikUploadRef.current) {
//             //@ts-ignore
//             ikUploadRef.current?.click();
//           }
//         }}
//       >
//         <NextImage
//           src="download.svg"
//           alt="download"
//           width={20}
//           height={20}
//           className="object-contain"
//         />

//         <p>Upload a File</p>
//       </Button>
//       {file && <p className="text-sm text-gray-400 mt-2">test{file.filePath}</p>}
//       {file && (
//         <div className="mt-4 flex flex-col items-center">
//           <IKImage
//             alt={file.filePath}
//             path={file.filePath}
//             width={500}
//             height={300}
//           />
//         </div>
//       )}
//     </ImageKitProvider>
//   );
// };

// export default ImageUpload;

"use client";

import React, { useRef, useState } from "react";
import { ImageKitProvider, IKUpload, IKImage } from "imagekitio-next";
import config from "@/lib/config";
import NextImage from "next/image";
import { Button } from "./ui/button";
import { toast } from "sonner";

const { env: { imageKit: { publicKey, urlEndpoint } } } = config;

// ----------------- Authenticator -----------------
const authenticator = async () => {
  try {
    // Відносний шлях гарантує, що origin збігається
    const response = await fetch("/api/auth/imagekit", {
      credentials: "include", // якщо потрібні куки
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

// ----------------- ImageUpload Component -----------------
const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikUploadRef = useRef<any>(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const handleError = (error: any) => {
    console.error("Upload failed:", error);
    toast("Image upload failed", {
      description: "Your image could not be uploaded. Please try again.",
    });
  };

  const handleSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast("Image uploaded successfully", {
      description: `${res.filePath} uploaded successfully.`,
    });
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      {/* Схований input для завантаження */}
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={handleError}
        onSuccess={handleSuccess}
        fileName={`upload_${Date.now()}.jpg`}
      />

      {/* Кнопка для виклику діалогу вибору файлу */}
      <Button
        className="w-full flex items-center gap-2 border border-gray-100 rounded-md px-3 py-2 text-white cursor-pointer hover:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            ikUploadRef.current.click();
          }
        }}
      >
        <NextImage
          src="/download.svg"
          alt="download"
          width={20}
          height={20}
          className="object-contain"
        />
        <p>Upload a File</p>
      </Button>

      {/* Вивід шляху завантаженого файлу */}
      {file && <p className="text-sm text-gray-400 mt-2">{file.filePath}</p>}

      {/* Попередній перегляд зображення */}
      {file && (
        <div className="mt-4 flex flex-col items-center">
          <IKImage
            path={file.filePath}
            width={500}
            height={300}
            alt="Uploaded Image"
          />
        </div>
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
