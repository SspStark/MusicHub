'use client'

import { ClipLoader } from 'react-spinners';

export default function Loader() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <ClipLoader size={40} color="chartreuse" />
      {/* <PuffLoader size={60} color="chartreuse" /> */}
    </div>
  );
}