"use client";

import React, { useRef, useState } from "react";
// import { Image, Video, ImageKitProvider, upload ,ImageKitContext } from '@imagekit/next';
// import { Image, Video, ImageKitProvider } from "@imagekit/next";
import { ImageKitProvider, IKUpload, IKImage } from "imagekitio-next";
import config from "@/lib/config";
import ImageKit from "imagekit";
import { ur } from "zod/v4/locales";
import NextImage from "next/image";
import { Button } from "./ui/button";

const {
  env: {
    imageKit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/qpi/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed wit status ${response.status}:
        ${errorText}`);
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed ${error.message}`);
  }
};

const ImageUpload = () => {
  const ikuploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const OnError = () => {};

  const OnSuccess = () => {};

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikuploadRef}
        onError={OnError}
        onSuccess={OnSuccess}
        fileName="/images/excavator.jpeg"
      />
      <Button className="w-full flex items-center gap-2 border border-gray-100 rounded-md px-3 py-2 text-white cursor-pointer hover:border-blue-500 focus:ring-1 focus:ring-blue-500 transition">
        <NextImage
          src="download.svg"
          alt="calendar"
          width={20}
          height={20}
          className="object-contain"
        />

        <p>Upload a File</p>
        {file && <p className="text-white">test{file.filePath}</p>}
        {file && (
          <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={500}

          />
        )}
      </Button>
    </ImageKitProvider>
  );
};

export default ImageUpload;
