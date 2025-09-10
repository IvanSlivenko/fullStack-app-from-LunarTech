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
import { error } from "console";

import { toast } from "sonner";

const {
  env: {
    imageKit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    // const response = await fetch(`${config.env.apiEndpoint_2}/api/auth/imagekit`);
    const response = await fetch("/api/auth/imagekit");
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

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const OnError = (error: any, res: any) => {
    console.log(error);
    toast("Image ulpoaded failed", {
      description: `Your image could not be upload. Please try again`,
      // variant: "destructive"
    });
  };

  const OnSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast("Image ulpoaded succefull", {
      description: `${res.filePath} uploaded successfully`,
    });
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={OnError}
        onSuccess={OnSuccess}
        // fileName="/images/excavator.jpeg"
        fileName={`upload_${Date.now()}.jpg`}
      />
      <Button
        className="w-full flex items-center gap-2 border border-gray-100 rounded-md px-3 py-2 text-white cursor-pointer hover:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            //@ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <NextImage
          src="download.svg"
          alt="download"
          width={20}
          height={20}
          className="object-contain"
        />

        <p>Upload a File</p>
      </Button>
      {file && <p className="text-sm text-gray-400 mt-2">test{file.filePath}</p>}
      {file && (
        <div className="mt-4 flex flex-col items-center">
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={300}
          />
        </div>
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
