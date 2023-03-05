import ColorPicker from './components/ColorPicker';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-700">
      <ColorPicker />
      <Toaster position="top-right" />
    </div>
  );
}
