import { FaSpinner } from 'react-icons/fa';

const Procesando = () => {
  return (
    <div className="flex items-center justify-center h-16">
      <FaSpinner className="animate-spin text-yellow-400 text-4xl" />
    </div>
  );
};

export default Procesando;
