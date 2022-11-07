import { useEffect, useRef, useState } from 'react';
import { rgbToHex } from '../utils/rgbToHex';
import ImageUpload from './ImageUpload';

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

  return (
    <div className="flex flex-col space-y-4 rounded-lg bg-slate-700 px-4 py-10">
      <ImageUpload />

      <div className="flex items-center justify-between">
        <button
          onClick={handleColorPick}
          className="rounded-md bg-slate-800 p-3 transition hover:bg-slate-900"
        >
          Color Pick
        </button>
        <div
          style={{
            backgroundColor: `${hexValue}`,
          }}
          className={`h-8 w-8 rounded-full border`}
        ></div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div aria-label="RGB Value" className="relative">
          <input
            type="text"
            className="w-full border-b bg-transparent p-2"
            placeholder="RGB Value"
            defaultValue={rgbValue}
            readOnly
          />
          {/* 클립보드 아이콘 */}
        </div>
        <div aria-label="Hex Value" className="relative">
          <input
            type="text"
            className="w-full border-b bg-transparent p-2"
            placeholder="HEX Value"
            value={hexValue}
            readOnly
          />
          {/* 클립보드 아이콘 */}
        </div>
      </div>

      <div aria-label="Error Message">
        <p className="font-semibold text-red-400">{error}</p>
      </div>
    </div>
  );
}
