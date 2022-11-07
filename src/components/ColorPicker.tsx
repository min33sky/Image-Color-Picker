import ImageUpload from './ImageUpload';

export default function ColorPicker() {
  return (
    <div className="flex flex-col space-y-4 rounded-lg bg-slate-700 px-4 py-10">
      <ImageUpload />

      <div className="flex items-center justify-between">
        <button className="bg-slate-700 p-2">Color Pick</button>
        <div>색상 보여주기</div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div aria-label="RGB Value" className="relative">
          <input
            type="text"
            className="w-full p-2"
            placeholder="RGB Value"
            readOnly
          />
          {/* 클립보드 아이콘 */}
        </div>
        <div aria-label="Hex Value" className="relative">
          <input
            type="text"
            className="w-full p-2"
            placeholder="HEX Value"
            readOnly
          />
          {/* 클립보드 아이콘 */}
        </div>
      </div>

      <div aria-label="Error Message">
        <p></p>
      </div>
    </div>
  );
}
