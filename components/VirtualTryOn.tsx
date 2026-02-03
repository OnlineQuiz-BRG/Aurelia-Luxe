
import React, { useRef, useEffect, useState } from 'react';
import { X, Maximize2, Move, Camera, RefreshCw } from 'lucide-react';
import { Product } from '../types';

interface VirtualTryOnProps {
  product: Product;
  onClose: () => void;
}

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ product, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user' },
          audio: false 
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setError("Unable to access camera. Please ensure permissions are granted.");
      }
    };
    startCamera();

    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setPosition({
      x: (clientX / window.innerWidth) * 100,
      y: (clientY / window.innerHeight) * 100,
    });
  };

  return (
    <div className="fixed inset-0 z-[110] bg-charcoal flex flex-col items-center justify-center overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20 glass-dark">
        <div className="flex items-center space-x-3">
          <Camera className="text-gold" size={20} />
          <h2 className="text-sm font-serif tracking-widest text-white uppercase">Virtual Atelier</h2>
        </div>
        <button onClick={onClose} className="text-white hover:text-gold transition-colors">
          <X size={24} />
        </button>
      </div>

      {error ? (
        <div className="text-center p-8 space-y-4">
          <p className="text-gold font-serif italic">{error}</p>
          <button onClick={onClose} className="text-white border-b border-gold text-xs uppercase tracking-widest">Return to Boutique</button>
        </div>
      ) : (
        <div 
          className="relative w-full h-full cursor-crosshair"
          onMouseMove={handleMouseMove}
          onTouchMove={handleMouseMove}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchEnd={() => setIsDragging(false)}
        >
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover scale-x-[-1]"
          />

          {/* Jewelry Overlay */}
          <div 
            className="absolute pointer-events-auto select-none transition-transform duration-75 active:scale-105"
            style={{ 
              left: `${position.x}%`, 
              top: `${position.y}%`,
              transform: `translate(-50%, -50%) scale(${scale})`,
            }}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            <img 
              src={product.images[0]} 
              alt="Virtual Try-On"
              className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-2xl"
              draggable={false}
            />
            {isDragging && (
              <div className="absolute inset-0 border-2 border-gold/50 rounded-full animate-pulse pointer-events-none" />
            )}
          </div>

          {/* Instructions Overlay */}
          {!isDragging && (
            <div className="absolute bottom-32 left-0 right-0 text-center pointer-events-none">
              <p className="text-white/60 text-[10px] uppercase tracking-widest-luxury bg-charcoal/40 inline-block px-4 py-2 backdrop-blur-sm">
                Drag the {product.category.toLowerCase().slice(0, -1)} to envision your legacy
              </p>
            </div>
          )}

          {/* Controls */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center space-x-8 glass-dark p-4 rounded-full border border-gold/20">
            <button 
              onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
              className="p-2 text-white hover:text-gold transition-colors"
            >
              <Maximize2 size={18} className="scale-75" />
            </button>
            <div className="w-px h-6 bg-gold/20" />
            <div className="text-[10px] uppercase tracking-widest text-gold font-bold">Scale</div>
            <div className="w-px h-6 bg-gold/20" />
            <button 
              onClick={() => setScale(s => Math.min(2.5, s + 0.1))}
              className="p-2 text-white hover:text-gold transition-colors"
            >
              <Maximize2 size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualTryOn;
