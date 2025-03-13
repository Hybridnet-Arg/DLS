import Image from 'next/image';

export default function BobinaImage({ width = 100, height = 100 }) {
  const getImage = () => {
    const type = 'success';
    const elementName = 'bobina';
    return `/static/images/ciclos-cable-tonelada-milla/${elementName}/${elementName}-${type}.png`;
  };

  return (
    <Image
      alt="bobina-tonelada-milla"
      width={width}
      height={height}
      src={getImage()}
      unoptimized
    />
  );
}
