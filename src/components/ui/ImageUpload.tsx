"use client";

import { cn } from "@/lib/utils";
import { PlusIcon } from "@/components/icons";
import { useId, useState } from "react";

export interface ImageUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'accept'> {
  label?: string;
  helperText?: string;
  maxSize?: number; // in MB
  acceptedFormats?: string[];
  onImageChange?: (file: File | null, previewUrl: string | null) => void;
  containerClassName?: string;
  previewClassName?: string;
}

export const ImageUpload = ({
  label = "Label",
  helperText = "5MB 미만의 .png, .jpg 파일",
  maxSize = 5,
  acceptedFormats = ['.png', '.jpg', '.jpeg'],
  onImageChange,
  containerClassName,
  previewClassName,
  className,
  id: idProp,
  onChange,
  ...inputProps
}: ImageUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const labelId = useId();
  const internalId = useId();
  const inputId = idProp ?? internalId;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setPreviewUrl(null);
      setError(null);
      onImageChange?.(null, null);
      onChange?.(e);
      return;
    }

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      setError(`파일 크기는 ${maxSize}MB 이하여야 합니다.`);
      setPreviewUrl(null);
      onImageChange?.(null, null);
      return;
    }

    // Validate file format
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedFormats.includes(fileExtension)) {
      setError(`${acceptedFormats.join(', ')} 파일만 업로드 가능합니다.`);
      setPreviewUrl(null);
      onImageChange?.(null, null);
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      setError(null);
      onImageChange?.(file, result);
    };
    reader.readAsDataURL(file);

    onChange?.(e);
  };

  const handleClick = () => {
    const input = document.getElementById(inputId) as HTMLInputElement;
    input?.click();
  };

  return (
    <div className={cn("flex flex-col items-start gap-2", containerClassName)}>
      {label && (
        <label
          id={labelId}
          htmlFor={inputId}
          className="fontSize-label-m text-gray-600 flex items-center self-stretch"
        >
          {label}
        </label>
      )}

      <div className="flex flex-row items-end gap-3">
        <input
          id={inputId}
          type="file"
          accept={acceptedFormats.join(',')}
          onChange={handleFileChange}
          className="sr-only"
          aria-labelledby={label ? labelId : undefined}
          {...inputProps}
        />

        <button
          type="button"
          onClick={handleClick}
          className={cn(
            "flex flex-row justify-center items-center w-[120px] h-[120px] rounded-[8px] flex-none",
            previewUrl
              ? "bg-cover bg-center bg-no-repeat"
              : "bg-white border border-dashed border-primary p-[42px]",
            previewClassName
          )}
          style={previewUrl ? { backgroundImage: `url(${previewUrl})` } : undefined}
          aria-label={previewUrl ? "Change image" : "Upload image"}
        >
          {!previewUrl && (
            <PlusIcon size={24} className="text-primary" />
          )}
        </button>

        <span className="fontSize-label-m text-gray-500 flex items-center">
          {error || helperText}
        </span>
      </div>
    </div>
  );
};
