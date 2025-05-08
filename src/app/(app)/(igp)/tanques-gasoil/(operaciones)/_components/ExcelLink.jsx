'use client';

export default function ExcelLink() {
  const handleDownload = () => {
    const fileUrl = '/static/excel/Tabla_Cubicaje_Tanque_Gasoil_DLS_4169.xlsx';
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'Tabla_Cubicaje_Tanque_Gasoil_DLS_4169.xlsx';
    link.click();
  };

  return (
    <div className="flex justify-end gap-10 pr-4 pt-4">
      <button
        onClick={handleDownload}
        className="text-blue-600 hover:underline text-sm mb-4"
      >
        Descargar tabla de cubicaje
      </button>
    </div>
  );
}
