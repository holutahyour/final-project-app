import { Router } from 'next/router';
import React from 'react'

function unauthorized() {
  return (
    <div className="flex justify-center items-center flex-col gap-3 h-3/4">
      <h3 className="text-3xl font-extrabold">Error </h3>
      <p className="font-semibold">You do not have access to this page</p>
      <button
        // onClick={() => Router.back()}
        className="bg-Rapha-teal-brand shadow-lg px-4 py-1 text-white rounded-md"
      >
        &larr; Go Back
      </button>
    </div>
  );
}

export default unauthorized