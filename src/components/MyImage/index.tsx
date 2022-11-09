import Image, { ImageLoaderProps } from 'next/image';

const normalizeSrc = (src: string) => {
  return src.startsWith('/') ? src.slice(1) : src;
};

const cloudflareLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const params = [`width=${width}`];
  if (quality) {
    params.push(`quality=${quality}`);
  }
  const paramsString = params.join(',');
  return `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
};

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
      loader={cloudflareLoader}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default MyImage;
