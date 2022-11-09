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
  width: string;
  height: string;
  alt?: string;
  className?: string;
}) => {
  return (
    <Image
      loader={cloudflareNoqualityLoader}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default MyImage;
