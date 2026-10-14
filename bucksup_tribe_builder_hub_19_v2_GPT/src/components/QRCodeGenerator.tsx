
import React from 'react';

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ value, size = 200 }) => {
  // Using a QR code API service for generating QR codes
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}`;

  return (
    <div className="flex items-center justify-center">
      <img
        src={qrCodeUrl}
        alt="QR Code"
        width={size}
        height={size}
        className="border rounded-lg"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default QRCodeGenerator;

