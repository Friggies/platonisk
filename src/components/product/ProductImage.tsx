import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import styles from './ProductImage.module.scss';
import { RootState } from '../../store';

interface ProductImageProps {
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
}

const ProductImage = ({
  src,
  alt,
  title,
  width,
  height,
}: ProductImageProps) => {
  const [transformStyle, setTransformStyle] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const animationsActive = useSelector(
    (state: RootState) => state.animation.animationsActive
  );

  const animationRef = useRef<number | null>(null);

  const generateRandomTransform = () => {
    const rotate = Math.random() * 10 - 5; // -5° to 5°
    const scale = 1 + (Math.random() * 0.1 - 0.05); // 0.95 to 1.05
    const translateX = Math.random() * 10 - 5; // -5px to 5px
    const translateY = Math.random() * 10 - 5; // -5px to 5px
    return `rotate(${rotate}deg) scale(${scale}) translate(${translateX}px, ${translateY}px)`;
  };

  const animate = () => {
    if (isHovered || !animationsActive) return;
    setTransformStyle(generateRandomTransform());
    const randomInterval = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
    animationRef.current = window.setTimeout(animate, randomInterval);
  };

  useEffect(() => {
    if (animationsActive && !isHovered) {
      animate();
    }

    return () => {
      if (animationRef.current !== null) {
        clearTimeout(animationRef.current);
      }
    };
  }, [isHovered, animationsActive]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={src}
        alt={alt}
        title={title}
        width={width}
        height={height}
        style={{
          transform: transformStyle,
          transition: 'transform 0.3s ease',
        }}
        className={styles.image}
      />
    </div>
  );
};

export default ProductImage;
