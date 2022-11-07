import ColorPicker from './components/ColorPicker';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-800 text-slate-200">
      <ColorPicker />
      <Toaster />
    </div>
  );
}
