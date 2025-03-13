'use client';
import { Fragment, useEffect, useState } from 'react';
import { DEFAULT_PAGE } from '@/constants';
import usePerforadoresStore from '@/store/perforadores.store';
import { obtenerPerforadorPiezas } from '@/services/schb/perforadorPieza.service';
import Table from '@/components/table/Table';
import Title from '@/components/ui/labels/Title';
import Button from '@/components/ui/buttons/Button';
import Pagination from '@/components/pagination/Pagination';
import Filters from './_components/Filters';
import EliminarPiezaModal from './_components/modals/EliminarPiezaModal';

const LIMIT = 8;

export default function StockAlmacenPage() {
  const { perforadorSeleccionado } = usePerforadoresStore();

  const [records, setRecords] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const fetchData = async (customPage = null) => {
    setIsLoading(true);
    try {
      const queryParameters = {
        perforador: perforadorSeleccionado?.idPerforador,
        baja: 0,
        en_uso: 0,
        page: customPage ?? page,
        limit: LIMIT,
        ...filters,
      };

      const data = await obtenerPerforadorPiezas(queryParameters);

      setRecords(data?.data ?? []);
      setTotalPages(data?.totalPages);
      setTotalRecords(data?.totalRecords);
    } catch (error) {
      setRecords([]);
      setTotalPages(0);
      setTotalRecords(0);
    } finally {
      setIsLoading(false);
      setSelectedRow(null);
      setIsMounted(true);
    }
  };

  useEffect(() => {
    setPage(DEFAULT_PAGE);
    fetchData(DEFAULT_PAGE);

    return () => {
      setRecords([]);
      setTotalPages(0);
      setTotalRecords(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perforadorSeleccionado?.idPerforador, filters]);

  useEffect(() => {
    if (isMounted) fetchData();

    return () => {
      setRecords([]);
      setTotalPages(0);
      setTotalRecords(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleRowClick = (row) => setSelectedRow(row);

  const columns = [
    {
      key: 'tipo',
      title: 'Tipo'.toLocaleUpperCase(),
      render: (row) => row?.pieza?.tipo,
    },
    {
      key: 'ref',
      title: 'Ref'.toLocaleUpperCase(),
      render: (row) => row?.pieza?.nroPieza ?? '-',
    },
    {
      key: 'stock',
      title: 'Stock'.toLocaleUpperCase(),
      render: (row) => row?.pieza?.piezaPerforador?.[0]?.stock,
    },
    {
      key: 'marca',
      title: 'Marca'.toLocaleUpperCase(),
      render: (row) => row?.marca?.marca ?? '-',
    },
    {
      key: 'modelo',
      title: 'Modelo'.toLocaleUpperCase(),
      render: (row) => row?.modelo?.modelo ?? 'Sin modelo',
    },
    {
      key: 'diametro',
      title: 'DIAMETRO (in)',
      render: (row) => row?.diametro?.diametro ?? 'Sin diametro',
    },
    {
      key: 'hs',
      title: 'hs'.toLocaleUpperCase(),
    },
    {
      key: 'serie',
      title: 'Numero de serie'.toLocaleUpperCase(),
    },
  ];

  function onFilter(title, filter) {
    setFilters({ ...filters, [title]: filter });
  }

  return (
    <div className="mx-3 my-2">
      <Title>Stock de piezas de almacén</Title>
      <div className="grid grid-cols-5 gap-5">
        <Filters
          onFilter={onFilter}
          setShowModal={setShowModal}
          showModal={showModal}
          setShowEditModal={setShowEditModal}
          showEditModal={showEditModal}
          onFinishCreatePiece={fetchData}
          pieza={selectedRow}
        />
        <div className="col-span-4">
          <Table
            columns={columns}
            data={records}
            loading={isLoading}
            selectedRow={selectedRow}
            handleRowClick={handleRowClick}
          />
          <div className="flex justify-between">
            <div>
              {totalRecords > LIMIT && (
                <Pagination
                  className="flex"
                  currentPage={page}
                  totalPages={totalPages}
                  pageSize={LIMIT}
                  onPageChange={(page) => setPage(page)}
                />
              )}
            </div>
            <div className="flex gap-2 self-end">
              {selectedRow && (
                <Fragment>
                  <Button onClick={() => setShowDeleteModal(true)}>
                    eliminar
                  </Button>
                  <Button onClick={() => setShowEditModal(true)}>
                    modificar
                  </Button>
                </Fragment>
              )}
              <Button onClick={() => setShowModal(true)}>cargar</Button>
            </div>
          </div>
        </div>
        <EliminarPiezaModal
          pieza={selectedRow}
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
          onFinish={async () => {
            await fetchData();
            setSelectedRow(null);
          }}
        />
      </div>
    </div>
  );
}
