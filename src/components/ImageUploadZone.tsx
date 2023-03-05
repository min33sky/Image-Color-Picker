import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 이미지 업로드 컴포넌트
 *
 * @description 이미지를 드래그 또는 클릭으로 업로드 할 수 있습니다.
 */
export default function ImageUploadZone() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const labelRef = useRef<HTMLLabelElement>(null);

  /**
   * 미리보기 이미지 제거
   */
  const removeImage = useCallback(() => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
      setImageUrl(null);
    }
  }, [imageUrl]);

  /**
   * 이미지 업로드 핸들러
   */
  const handleOnChangePicture: React.ChangeEventHandler<
    HTMLInputElement
  > = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // 미리보기 이미지 설정
      const previewImage = URL.createObjectURL(file);
      setImageUrl(previewImage);

      //? 같은 파일을 다시 선택했을 때, onChange 이벤트가 발생하지 않는다.
      //? 그래서 초기화를 해줘야 다시 선택해도 이벤트가 Trigger 된다.
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    labelRef.current?.classList.add('bg-indigo-900/10');
  };

  const handleDragEnd = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    labelRef.current?.classList.remove('bg-indigo-900/10');
  };

  const handleImageDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (
      e.dataTransfer.files &&
      e.dataTransfer.files.length > 0 &&
      labelRef.current
    ) {
      const files = e.dataTransfer.files[0];
      setImageUrl(URL.createObjectURL(files));
      labelRef.current?.classList.remove('bg-indigo-900/10');
    }
  };

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl); // 브라우저 메모리 해제
      }
    };
  }, [imageUrl]);

  return (
    <div aria-label="Area for image upload" className="relative flex flex-col">
      {imageUrl && (
        <button
          aria-label="Remove Preview Image"
          title="미리보기 이미지 제거"
          onClick={removeImage}
          className="absolute top-2 right-2 z-50"
        >
          <XMarkIcon className="h-6 w-6 text-slate-400  transition-colors duration-200 hover:text-red-500" />
        </button>
      )}

      <label
        ref={labelRef}
        title="클릭 또는 드래그로 이미지를 업로드하세요."
        className="
            aspect-w-16 aspect-h-9 relative flex cursor-pointer
            items-center justify-center rounded-md
            border-2 border-dashed border-slate-400  text-slate-400
            transition hover:border-slate-800 hover:text-slate-800"
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragLeave={handleDragEnd}
        onDrop={handleImageDrop}
      >
        {imageUrl && (
          <>
            <img src={imageUrl} className="object-contain" />
          </>
        )}

        {!imageUrl && (
          <svg
            className="absolute top-1/2 left-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 transform"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}

        <input
          className="hidden"
          type="file"
          accept=".png, .jpg, .jpeg, .gif"
          onChange={handleOnChangePicture}
        />
      </label>
    </div>
  );
}
