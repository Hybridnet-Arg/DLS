import BackButton from '@/components/ui/buttons/BackButton';
import SelectorPerforadores from '@/components/selectorPerforadores';

export const metadata = {
  title: {
    default: 'Ciclos de cable tonelada milla',
  },
};

export default function CiclosCableToneladaMillaLayout({ children }) {
  return (
    <div className="mt-2 mx-5 pb-5">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-medium">Sistema de horas de bomba</h1>
        <div className="flex justify-between items-center gap-4">
          <BackButton href="/" />
          <SelectorPerforadores onlyDrillers showAccess={false} />
        </div>
      </div>
      {children}
    </div>
  );
}
