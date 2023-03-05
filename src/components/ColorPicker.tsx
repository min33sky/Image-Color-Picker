import React, { useEffect, useRef, useState } from 'react';
import ImageUploadZone from './ImageUploadZone';
import {
  ClipboardIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

declare global {
  interface Window {
    EyeDropper: any;
  }
}

export default function ColorPicker() {
  const [error, setError] = useState('');
  const [rgbValue, setRgbValue] = useState('');
  const [hexValue, setHexValue] = useState('');
  const eyeDropper = useRef<any>();

  useEffect(() => {
    if (typeof window && 'EyeDropper' in window) {
      console.log('지원 하는 Browser :)');
      eyeDropper.current = new window.EyeDropper();
    } else {
      console.log('지원 안하는 Browser');
      setError('지원하지 않는 브라우저 입니다...');
    }
  }, []);

  /**
   * 색상 추출 핸들러
   *
   * @description image의 Hex, RGB 값을 추출하여 상태에 저장
   */
  const handleColorPick = async () => {
    if (eyeDropper.current) {
      try {
        const colorValue = await eyeDropper.current.open();
        const hex = colorValue.sRGBHex;
        const rgbArr = [];

        //? hex 값을 rgb로 변환 (ex. #ffffff -> rgb(255, 255, 255)
        for (let i = 1; i < hex.length; i += 2) {
          rgbArr.push(parseInt(hex[i] + hex[i + 1], 16));
        }

        setHexValue(hex.toUpperCase());
        setRgbValue(`RGB(${rgbArr.join(', ')})`);
      } catch (e: any) {
        console.log(e.message);
      }
    }
  };

  /**
   * 클립보드 복사 핸들러
   */
  const handleClipboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!rgbValue || !hexValue) {
      toast.error('먼저 이미지의 색상을 추출해주세요.');
      return;
    }

    const value = e.currentTarget.name;
    navigator.clipboard.writeText(value === 'rgb' ? rgbValue : hexValue);
    toast.success('클립보드에 복사되었습니다.');
  };

  return (
    <div className="flex flex-col space-y-8 rounded-lg bg-slate-100 px-8 py-10">
      <header>
        <h1 className="text-center text-2xl font-semibold text-slate-700">
          이미지 색상 추출기
        </h1>
      </header>

      <ImageUploadZone />

      <div className="flex items-center justify-between">
        <button
          aria-label="Button for Color Pick"
          title="색상 추출"
          onClick={handleColorPick}
          className="flex items-center gap-2 rounded-md bg-slate-600 px-4 py-2 transition-colors duration-200 hover:bg-slate-900"
        >
          <MagnifyingGlassIcon className="h-6 w-6 text-slate-200" />
          <p className="text-slate-100">Color Pick</p>
        </button>

        <div
          aria-label="Color Preview"
          title="색상 미리보기"
          style={{
            backgroundColor: `${hexValue}`,
          }}
          className={`h-8 w-8 rounded-full border-2 border-slate-400`}
        ></div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="relative">
          <input
            aria-label="Input for RGB Value"
            type="text"
            className="w-full select-none border-b border-b-slate-400 bg-transparent p-2 outline-none"
            placeholder="RGB"
            defaultValue={rgbValue}
            readOnly
          />
          <button
            aria-label="Button to copy RGB Value"
            title="클립보드에 복사"
            name="rgb"
            onClick={handleClipboard}
          >
            <ClipboardIcon className="absolute right-0 top-1/2 h-6 w-6 -translate-y-1/2 transition hover:text-yellow-500" />
          </button>
        </div>

        <div className="relative">
          <input
            aria-label="Input for Hex Value"
            type="text"
            className="w-full select-none border-b border-b-slate-400 bg-transparent p-2 outline-none"
            placeholder="HEX"
            value={hexValue}
            readOnly
          />
          <button
            aria-label="Button to copy Hex Value"
            title="클립보드에 복사"
            name="hex"
            onClick={handleClipboard}
          >
            <ClipboardIcon className="absolute right-0 top-1/2 h-6 w-6 -translate-y-1/2 transition hover:text-yellow-500" />
          </button>
        </div>
      </div>

      <div aria-label="Error Message">
        <p className="font-semibold text-red-400">{error}</p>
      </div>
    </div>
  );
}
