import React, { useEffect, useRef, useState } from 'react';

type BlurRevealImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export const BlurRevealImage: React.FC<BlurRevealImageProps> = ({
  className,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  const handleLoad: React.ReactEventHandler<HTMLImageElement> = (event) => {
    setIsLoaded(true);
    onLoad?.(event);
  };

  const handleError: React.ReactEventHandler<HTMLImageElement> = (event) => {
    setIsLoaded(true);
    onError?.(event);
  };

  return (
    <img
      {...props}
      ref={imageRef}
      onLoad={handleLoad}
      onError={handleError}
      className={`blur-reveal-image ${isLoaded ? 'blur-reveal-image--loaded' : ''} ${className ?? ''}`.trim()}
    />
  );
};
