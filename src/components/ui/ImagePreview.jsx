/* eslint-disable react/prop-types */

import { Plus } from "lucide-react";

const ImagePreview = ({ imagePreview }) => {
  return (
    <div className="h-48 mt-2 w-48 flex items-center justify-center border border-input rounded-md bg-gray-100 overflow-hidden">
      {imagePreview ? (
        <img
          src={imagePreview}
          alt="Preview"
          className="w-full h-full object-contain"
        />
      ) : (
        <Plus size={50} className="text-primary" />
      )}
    </div>
  );
};

export default ImagePreview;
