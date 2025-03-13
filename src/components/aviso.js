import React, { useState, useEffect } from 'react';

const Aviso = (props) => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (props.show) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [props.show]);

  return (
    <>
      {showModal && (
        <div className="fixed top-0 z-40 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-xl font-bold mb-4">Aviso</h2>
            <p className="text-gray-800">Este es un aviso importante.</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Aviso;
