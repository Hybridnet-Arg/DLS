import CanioLavadorMenu from '../components/CanioLavadorMenu/CanioLavadorMenu';

export default function CanioLavadorLayout({ children }) {
  return (
    <div className="px-3 py-5 rounded-md">
      <div className="bg-white">
        <div className="grid grid-cols-4 gap-4">
          <CanioLavadorMenu />
          <div className="px-5 rounded-md col-span-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
