import CanioLavadorSkeleton from '../components/CanioLavadorSkeleton';

export default function CanioLavador({ searchParams }) {
  if (searchParams?.empty) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2>No hay datos disponibles...</h2>
      </div>
    );
  }
  return <CanioLavadorSkeleton />;
}
