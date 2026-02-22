import { useRef, useEffect } from 'react';
import { encodeCode128 } from '../utils/barcode';

export default function BarcodeCanvas({ value, height = 60, fontSize = 11, showText = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !value) return;
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const encoded = encodeCode128(value);
      if (!encoded) return;

      const barWidth = 1.5;
      const totalWidth = encoded.length * barWidth + 20;
      const totalHeight = height + (showText ? fontSize + 8 : 0);

      canvas.width = totalWidth;
      canvas.height = totalHeight;

      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#000';
      let x = 10;
      for (let i = 0; i < encoded.length; i++) {
        if (encoded[i] === '1') {
          ctx.fillRect(x, 0, barWidth, height);
        }
        x += barWidth;
      }

      if (showText) {
        ctx.font = `${fontSize}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(value, totalWidth / 2, height + fontSize + 2);
      }
    } catch (e) {
      /* silent fail */
    }
  }, [value, height, fontSize, showText]);

  if (!value) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', maxWidth: '100%' }}
    />
  );
}
