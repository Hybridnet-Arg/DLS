import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import './index.css';

export const metadata = {
  title: {
    default: 'SCHB',
  },
};

export default function SCHBLayout({ children }) {
  return (
    <div className="schb h-screen">
      <Header />
      <div className="h-5/6  flex flex-row justify-start pt-5">
        <Sidebar />
        <div className=" flex-1 p-1 border rounded-xl overflow-auto bg-slate-100 mr-2">
          {children}
        </div>
      </div>
    </div>
  );
}
