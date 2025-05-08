'use client';
import { useState, useEffect } from 'react';
import { File, FileChartColumnIncreasing, X } from 'lucide-react';
import Modal from '../ui/modal/Modal';

const renderFileContent = (filePath, fileType, downloadFile = () => {}) => {
  if (!filePath) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-center text-gray-500">
          No se ha seleccionado ningún archivo.
        </p>
      </div>
    );
  }

  switch (fileType) {
    case 'pdf':
      return (
        <object
          data={filePath}
          type="application/pdf"
          className="w-full h-full border border-gray-300 rounded-lg"
        >
          <p className="p-4 text-center text-red-500">
            Tu navegador no puede mostrar el PDF. Puedes{' '}
            <a href={filePath} download className="text-blue-500 underline">
              descargarlo aquí
            </a>
            .
          </p>
        </object>
      );
    case 'image':
      return (
        <div className="flex items-center justify-center h-full bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={filePath}
            alt="Vista previa de imagen"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      );
    case 'excel':
      return (
        <div className="flex flex-col items-center justify-center h-full p-4 bg-gray-50">
          <div className="mb-4">
            <FileChartColumnIncreasing className="text-success" size={70} />
          </div>
          <p className="text-lg font-medium mb-1">Archivo Excel</p>
          <p className="text-sm text-gray-500 mb-4">
            Los archivos Excel no se pueden previsualizar en el navegador
          </p>
          <button
            onClick={downloadFile}
            className="px-4 py-2 bg-success text-white rounded hover:bg-green-700 transition-colors"
          >
            Descargar para ver
          </button>
        </div>
      );
    case 'text':
      return (
        <div className="h-full w-full p-4 bg-white overflow-auto">
          <iframe
            src={filePath}
            className="w-full h-full border-0"
            title="Vista previa de texto"
          >
            <p className="p-4 text-center text-red-500">
              Tu navegador no puede mostrar este archivo de texto. Puedes{' '}
              <a href={filePath} download className="text-blue-500 underline">
                descargarlo aquí
              </a>
              .
            </p>
          </iframe>
        </div>
      );
    default:
      return (
        <div className="flex flex-col items-center justify-center h-full p-4 bg-gray-50">
          <div className="mb-4">
            <File className="text-blue-500" size={70} />
          </div>
          <p className="text-lg font-medium mb-1">
            Tipo de archivo no soportado
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Este formato no puede ser previsualizado
          </p>
          <button
            onClick={downloadFile}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Descargar archivo
          </button>
        </div>
      );
  }
};

export default function FileViewer({ filePath = '', children, ...modalProps }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fileType, setFileType] = useState('');

  useEffect(() => {
    // Detectar el tipo de archivo basado en la extensión
    if (filePath) {
      const extension = filePath.split('.').pop().toLowerCase();
      if (extension === 'pdf') {
        setFileType('pdf');
      } else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
        setFileType('image');
      } else if (['xlsx', 'xls'].includes(extension)) {
        setFileType('excel');
      } else if (['txt', 'csv', 'json', 'html', 'md'].includes(extension)) {
        setFileType('text');
      } else {
        setFileType('unknown');
      }
    }
  }, [filePath]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const downloadFile = () => {
    if (!filePath) {
      alert('No hay un archivo disponible para descargar.');
      return;
    }

    const link = document.createElement('a');
    link.href = filePath;
    const fileName = filePath.split('/').pop() || 'archivo';
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal closable footer={<></>} {...modalProps}>
      <div className="file-viewer-container max-w-3xl mx-auto">
        <div
          className={`file-container ${isFullscreen ? 'fixed inset-0 z-50 bg-white flex flex-col' : 'relative'}`}
        >
          {isFullscreen && (
            <button
              onClick={toggleFullscreen}
              className="absolute top-[4rem] right-6 z-60 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 shadow-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          )}
          <div
            className={`w-full ${isFullscreen ? 'flex-grow' : 'h-[70vh]'} border border-gray-300 rounded-lg shadow-md overflow-hidden`}
          >
            {renderFileContent(filePath, fileType, downloadFile)}
          </div>
        </div>
        <div className="controls flex justify-between items-center mt-4 px-2">
          {(fileType === 'pdf' || fileType === 'image') && (
            <button
              onClick={toggleFullscreen}
              className="fullscreen-button px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              {isFullscreen
                ? 'Salir de pantalla completa'
                : 'Pantalla completa'}
            </button>
          )}

          <button
            onClick={downloadFile}
            className={`download-button px-3 py-1 bg-dark text-white rounded hover:opacity-60 flex items-center ${fileType === 'pdf' || fileType === 'image' ? '' : 'ml-auto'}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Descargar
          </button>
        </div>
        {children}
      </div>
    </Modal>
  );
}
