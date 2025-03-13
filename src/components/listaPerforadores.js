'use client';
import { useEffect, useContext, useState } from 'react';
import AuthContext from '@/context/auth/authContext';

const ListaPerforadores = ({
  onlyDrillers = false,
  showAccess = true,
  handleSelect = () => {},
}) => {
  const authContext = useContext(AuthContext);
  const { permisos, seleccionarPerforador } = authContext;

  const [selectedDriller, setSelectedDriller] = useState('');

  const handleChange = ({ target }) => {
    const perforador = target?.value && JSON.parse(target?.value);
    setSelectedDriller(target.value);
    handleSelect(perforador);
    seleccionarPerforador(perforador);
  };

  useEffect(() => {
    if (permisos?.length > 0) {
      const allDrilllers = onlyDrillers
        ? permisos.filter((permiso) => permiso?.idPerforador !== 'L')
        : permisos;

      if (allDrilllers?.length > 1) {
        const secondDriller = allDrilllers[1];
        setSelectedDriller(JSON.stringify(secondDriller));
        seleccionarPerforador(secondDriller);
      } else {
        const firstDriller = allDrilllers[0];
        setSelectedDriller(JSON.stringify(firstDriller));
        seleccionarPerforador(firstDriller);
      }
    }
  }, [permisos]);

  const renderPerforadores = () => {
    let allDrilllers = permisos ?? [];

    if (onlyDrillers) {
      allDrilllers = permisos?.filter(
        (permiso) => permiso?.idPerforador !== 'L'
      );
    }

    return allDrilllers?.map((driller) => (
      <option
        key={driller?.idPerforador + driller?.acceso}
        value={JSON.stringify(driller)}
      >
        {`${driller?.nombre} ${showAccess ? '(' + driller?.acceso + ')' : ''}`}
      </option>
    ));
  };

  return (
    <select
      onChange={handleChange}
      className="p-1 border rounded-md bg-slate-100 mr-3 shadow-md"
      value={selectedDriller}
    >
      {renderPerforadores()}
    </select>
  );
};

export default ListaPerforadores;
