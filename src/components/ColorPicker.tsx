import React, { useEffect, useRef, useState } from 'react';
import { rgbToHex } from '../utils/rgbToHex';
import ImageUpload from './ImageUpload';
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

  const handleColorPick = async () => {
    if (eyeDropper.current) {
      console.log('클릭');
      try {
        const colorValue = await eyeDropper.current.open();
        const rgb = colorValue.sRGBHex;

        const rgbArr = rgb
          .replace(/[^0-9]/g, ' ')
          .trim()
          .split(' ')
          .filter((n: any) => !!n);

        setRgbValue(rgb);
        setHexValue(rgbToHex(rgbArr[0], rgbArr[1], rgbArr[2]));
      } catch (e: any) {
        console.log(e.message);
      }
    }
  };

  const handleClipboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.name;
    navigator.clipboard.writeText(value === 'rgb' ? rgbValue : hexValue);
    toast.success('클립보드에 복사되었습니다.');
  };

  return (
    <div className="flex flex-col space-y-8 rounded-lg bg-slate-700 px-8 py-20">
      <header>
        <h1 className="text-center text-3xl font-bold text-slate-200">
          Image Color Picker
        </h1>
      </header>

      <ImageUpload />

      <div className="flex items-center justify-between">
        <button
          onClick={handleColorPick}
          className="flex items-center gap-2 rounded-md bg-slate-800 p-3 transition hover:bg-slate-900"
        >
          <MagnifyingGlassIcon className="h-6 w-6 text-slate-200" />
          Color Pick
        </button>
        <div
          style={{
            backgroundColor: `${hexValue}`,
          }}
          className={`h-8 w-8 rounded-full border-2 border-slate-400`}
        ></div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div aria-label="RGB Value" className="relative">
          <input
            type="text"
            className="w-full select-none border-b border-b-slate-400 bg-transparent p-2 outline-none"
            placeholder="RGB"
            defaultValue={rgbValue}
            readOnly
          />
          <button name="rgb" onClick={handleClipboard}>
            <ClipboardIcon className="absolute right-0 top-1/2 h-6 w-6 -translate-y-1/2 transition hover:text-slate-50" />
          </button>
        </div>
        <div aria-label="Hex Value" className="relative">
          <input
            type="text"
            className="w-full select-none border-b border-b-slate-400 bg-transparent p-2 outline-none"
            placeholder="HEX"
            value={hexValue}
            readOnly
          />
          <button name="hex" onClick={handleClipboard}>
            <ClipboardIcon className="absolute right-0 top-1/2 h-6 w-6 -translate-y-1/2 transition hover:text-slate-50" />
          </button>
        </div>
      </div>

      <div aria-label="Error Message">
        <p className="font-semibold text-red-400">{error}</p>
      </div>
    </div>
  );
}
