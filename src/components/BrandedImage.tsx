import type { CSSProperties } from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
  strong?: boolean;
  style?: CSSProperties;
};

export function BrandedImage({ src, alt, className = '', strong, style }: Props) {
  return (
    <div
      className={`branded-media ${strong ? 'branded-media--strong' : ''} ${className}`}
      style={style}
    >
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}
