import CanioLavadorMenu from '../components/CanioLavadorMenu/CanioLavadorMenu';

export default function TopDriveAlmacenLayout({ children }) {
  return (
    <div className="px-3 py-5 rounded-md">
      <div className="bg-white">
        <div className="grid grid-cols-4 gap-4">
          <CanioLavadorMenu redirectTo="/top-drive/almacen" />
          <div className="px-5 rounded-md col-span-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
