import React, { useRef } from 'react';
import { QRCodeSVG as QRCode } from 'qrcode.react';
import html2canvas from 'html2canvas';
import logo from '@/assets/favicon.svg';

const QRGenerator: React.FC<{ qrValue: string }> = ({ qrValue }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = (format: 'png' | 'jpeg') => {
    if (qrRef.current && logo) {
      html2canvas(qrRef.current, { backgroundColor: null }).then((canvas) => {
        const image = canvas.toDataURL(`image/${format}`);
        const link = document.createElement('a');
        link.href = image;
        link.download = `qr-menu.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    } else {
      alert('Logo yükleniyor, lütfen bekleyin...');
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">QR Menü</h2>
      <div className="flex flex-col items-center ">
        <div ref={qrRef}>
          <QRCode
            value={qrValue}
            size={256}
            level="H"
            fgColor="rgb(220 38 38)"
            imageSettings={{
              src: logo || '',
              height: 40,
              width: 40,
              excavate: true,
            }}
          />
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => downloadQRCode('png')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            PNG Olarak İndir
          </button>
          <button
            onClick={() => downloadQRCode('jpeg')}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            JPEG Olarak İndir
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
