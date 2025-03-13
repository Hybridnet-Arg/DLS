import {
  REGISTRAR_USUARIO,
  SELECCIONAR_PERFORADOR,
  LOGOUT,
} from '@/constants/dispachTypes.constant';

const SCHB_OU = 'OU=Sistema de Control de Horas de Bomba de lodo';
const SCHB_CN = 'CN=DMS-Administracion';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case REGISTRAR_USUARIO:
      const permisos = [];
      const listaPermisos = action?.payload?.permisos ?? [];
      for (let i = 0; i < listaPermisos.length; i++) {
        const valor = listaPermisos[i];

        if (valor.includes(SCHB_OU) && !valor.includes(SCHB_CN)) {
          const hasta = valor.indexOf(SCHB_OU) - 9;
          const val = valor.substr(8, hasta);
          const guion = val.indexOf('-');
          const nombre = val.substr(0, guion);
          const idPerforador = val.substr(guion - 3, 3);
          const acceso = val.substr(guion + 1);
          let tipoB = 'FD1600';
          let bombas = 3;
          let unidad = 'ARCNQ';
          let distribution = 'EQ_PERF' + idPerforador;
          if (idPerforador === '001') distribution = 'EQ_PAE_001';

          //define el tipo de bomba
          if (idPerforador === '156') {
            tipoB = 'LEWCO';
            bombas = 2;
            unidad = 'SILA2';
          } else if (idPerforador === '157') {
            tipoB = 'PZ';
            bombas = 2;
            unidad = 'SILA2';
          } else if (idPerforador === '160') {
            tipoB = 'BOMCO';
            bombas = 2;
            unidad = 'SILA2';
          } else if (idPerforador === '174' || idPerforador === '173') {
            tipoB = 'PZ2';
            bombas = 2;
            unidad = 'SILA2';
          } else if (idPerforador === '161' || idPerforador === '163') {
            tipoB = 'FD1600S';
            bombas = 3;
            unidad = 'ARCNQ';
          }

          const permiso = {
            idPerforador: idPerforador,
            nombre: nombre,
            acceso: acceso,
            tipoBomba: tipoB,
            cantBombas: bombas,
            unidadNegocio: unidad,
            distributionType: distribution,
          };

          permisos.push(permiso);
        }
      }

      return {
        ...state,
        usuario: action.payload.usuario,
        permisos: [...new Set(permisos)],
      };
    case SELECCIONAR_PERFORADOR:
      return {
        ...state,
        perforador: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        usuario: null,
        permisos: [],
        perforador: null,
      };
    default:
      return state;
  }
};
