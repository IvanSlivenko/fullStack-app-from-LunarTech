"use client"

import React from 'react'
// import { Image, Video, ImageKitProvider, upload ,ImageKitContext } from '@imagekit/next';
// import { Image, Video, ImageKitProvider } from "@imagekit/next";
import { ImageKitProvider, IKUpload, IKImage } from "imagekitio-next";

const authenticator = async ()=>{
  try{
const response = await fetch("/api/auth");
    if (!response.ok) throw new Error("Auth request failed");
    return await response.json();
  }catch (error: any){
    throw new Error(`Authentication request failed ${error.message}`); 
  }

}



const ImageUpload = () => {
  return (
    <div>ImageUpload</div>
  )
}

export default ImageUpload