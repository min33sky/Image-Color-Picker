import ColorPicker from './components/ColorPicker';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-700">
      <ColorPicker />
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}
