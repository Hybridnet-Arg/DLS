'use client';
import Link from 'next/link';
import { Paperclip } from 'lucide-react';
import { useEffect, useState } from 'react';
import Table from '@/components/table/Table';
import Title from '@/components/ui/labels/Title';
import Button from '@/components/ui/buttons/Button';
import { obtenerTubularesAdquisiciones } from '@/services/tubularesAdquisiciones.service';
import { DEFAULT_PAGE } from '@/constants';
import { formatToDDMMYYYY } from '@/utils/formatters/date.formatter';

const columns = [
  {
    key: 'perforador',
    title: 'perforador'.toLocaleUpperCase(),
    render: (record) => record?.perforador?.nombre ?? '',
  },
  {
    key: 'fecha',
    title: 'fecha'.toLocaleUpperCase(),
    render: (record) => (record?.fecha ? formatToDDMMYYYY(record?.fecha) : ''),
  },
  {
    key: 'cantidad',
    title: 'cantidad'.toLocaleUpperCase(),
    render: (record) => record?.cantidad ?? '',
  },
  {
    key: 'caracteristicas',
    title: 'caracteristicas'.toLocaleUpperCase(),
    render: (record) =>
      `${record?.tubulares_tipo_barra?.nombre}/${record?.tubulares_tipo_conexion?.nombre}/${record?.tubulares_rango?.nombre}`,
  },
  {
    key: 'proveedor',
    title: 'proveedor'.toLocaleUpperCase(),
    render: (record) => record?.tubulares_proveedor?.nombre ?? '',
  },
  {
    key: 'remito',
    title: 'remito'.toLocaleUpperCase(),
    render: (record) => record?.numero_remito ?? '-',
  },
  {
    key: 'reporte',
    title: 'reporte'.toLocaleUpperCase(),
    render: (record) => record?.numero_reporte ?? '-',
  },
  {
    key: 'ver',
    title: 'ver'.toLocaleUpperCase(),
    render: (record) => (
      <a
        href={`${process.env.NEXT_PUBLIC_BASE_URL}${record?.enlace_documento}`}
        target="_blank"
      >
        <button className="bg-gray-300 rounded-full p-1 hover:bg-gray-400 shadow-lg">
          <Paperclip size={16} />
        </button>
      </a>
    ),
  },
];

export default function AdquisicionDeTubularesPage() {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTubularesAdquisiciones = async () => {
    setIsLoading(true);
    try {
      const filters = {
        page: page,
      };
      const response = await obtenerTubularesAdquisiciones(filters);
      setRecords(response?.data);
      setTotalPages(response?.totalPages);
      setTotalRecords(response?.totalRecords);
    } catch (error) {
      setRecords([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTubularesAdquisiciones({});
    return () => {
      setRecords([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="flex flex-col justify-between px-5 py-2 min-h-[440px] 2xl:min-h-[500px] gap-5">
      <div>
        <Title className="pb-0 mb-0">Adquisición de tubulares</Title>
        <Table
          columns={columns}
          data={records}
          loading={isLoading}
          pagination={{
            currentPage: page,
            totalPages,
            totalRecords,
            onPageChange: (page) => setPage(page),
          }}
        />
      </div>
      <Link
        href={
          '/sistema-de-trazabilidad-para-tubulares/adquisicion-de-tubulares/adquirir'
        }
        className="flex justify-end"
      >
        <Button>adquirir tubulares</Button>
      </Link>
    </div>
  );
}
