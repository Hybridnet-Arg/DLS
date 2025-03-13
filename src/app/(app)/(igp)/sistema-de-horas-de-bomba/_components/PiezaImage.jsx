import Image from 'next/image';
import { ImageOff } from 'lucide-react';

const PATH_IMG = '/static/images/sistema-de-horas-de-bomba/piezas';
const PIEZAS_IMG_NAME = {
  ASIENTO: 'asiento',
  CAMISA: 'camisa',
  'CUERPO PISTON': 'cuerpo-piston',
  EMPAQUETADURA: 'empaquetadura',
  "O'RING MANIFOLD": 'o-ring-manifold',
  PISTON: 'piston',
  'PLATO DESGASTE': 'plato-desgaste',
  RESORTE: 'resorte',
  VALVULA: 'valvula',
};

export default function PiezaImage({ pieza, iconProps, ...imageProps }) {
  const getImage = () => {
    const image = PIEZAS_IMG_NAME?.[pieza?.tipo];
    if (!image) return;
    return `${PATH_IMG}/${image}.png`;
  };

  return getImage() ? (
    <Image src={getImage()} alt="pieza" unoptimized {...imageProps} />
  ) : (
    <div className="flex justify-center items-center">
      <ImageOff {...iconProps} />
    </div>
  );
}
