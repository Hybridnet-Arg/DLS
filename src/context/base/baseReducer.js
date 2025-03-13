import {
  GUARDAR_PIEZAS,
  GUARDAR_HORAS,
} from '@/constants/dispachTypes.constant';

export default (state, action) => {
  switch (action.type) {
    case GUARDAR_PIEZAS:
      return {
        ...state,
        piezas: action.payload,
      };

    case GUARDAR_HORAS:
      return {
        ...state,
        estado: action.payload,
      };
    default:
      return state;
  }
};
