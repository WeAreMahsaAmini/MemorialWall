import Image, { ImageLoaderProps } from 'next/image';

const cloudflareNoqualityLoader = ({ src }: ImageLoaderProps) => src;

const MyImage = ({
  src,
  width,
  alt = '',
  height,
  className = '',
}: {
  src: string;
  width: number;
  height: number;
  alt?: string;
  className?: string;
}) => {
  return (
    <Image
      loader={cloudflareNoqualityLoader}
      unoptimized
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default MyImage;
