import Navbar from '@/components/navbar/Navbar';
import { CONFIG } from '@/constants';

export default function IGPLayout({ children }) {
  return (
    <div
      className={`min-h-screen ${CONFIG.APP_ENV === 'production' ? 'bg-white' : CONFIG.APP_ENV === 'testing' ? 'bg-gradient-to-b from-[#F5D92F] from-0% via-[#F5D92F] via-70% to-[#88791E] to-100%' : 'bg-gradient-to-b from-[#9AA1C5] from-0% via-[#9AA1C5] via-70% to-[#3F3D69] to-100%'}`}
    >
      <Navbar />
      {children}
    </div>
  );
}
