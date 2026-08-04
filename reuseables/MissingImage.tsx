import React from "react";

interface MissingImageProps {
  label?: string;
  className?: string;
  aspect?: string;
  type?: "bgimage" | "icon" | "logo" | "default";
  alt?: string;
}

const MissingImage: React.FC<MissingImageProps> = ({
  label = "Add image in Strapi",
  className = "",
  aspect = "",
  type = "default",
  alt = "fallback image",
}) => {
  if (type === "bgimage") {
    return (
      <img
        src="/fallback.png"
        alt={alt}
        className={`object-cover w-full h-full ${className}`}
      />
    );
  }

  if (type === "icon") {
    return (
      <img
        src="/fallback-icon.svg"
        alt={alt}
        className={`object-contain w-8 h-8 ${className}`}
      />
    );
  }

  if (type === "logo") {
    return (
      <img
        src="/regen_logo.svg"
        alt={alt}
        className={`object-contain w-32 h-10 ${className}`}
      />
    );
  }

  const aspectClass = aspect || "aspect-video";

  return (
    <div
      className={`${aspectClass} ${className} flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 text-gray-500 text-sm rounded p-4`}
    >
      <svg
        className="w-8 h-8 mb-2 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <span className="font-medium text-center">{label}</span>
    </div>
  );
};

export default MissingImage;
