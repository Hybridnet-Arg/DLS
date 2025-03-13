'use client';
import clsx from 'clsx';
import axios from 'axios';
import React, { useState } from 'react';
import backgroundImage from '../../../public/static/images/construccion/background.jpg';
import Logo from '../../../public/static/images/construccion/logo.svg';
import Button from '@/components/ui/buttons/Button';

const Contruccion = () => {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitLoading(true);
    try {
      await axios.post('/api/suscribe', { email });
      alert('¡Gracias por suscribirte!');
      setIsSuccess(true);
    } catch (error) {
      alert('Error al suscribirse');
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${backgroundImage.src})` }}
    >
      <div className="text-center text-white">
        <h4 className="mb-4 text-lg">
          Este sitio se encuentra en estado de mantenimiento programado.
          <br />
          Agradecemos su comprensión
        </h4>
        <img className="mt-10 mb-4 mx-auto" src={Logo.src} alt="logo" />
        <a
          href="https://cua.dls-archer.com/"
          target="_blank"
          className="text-center block mb-10 text-decoration-none text-white"
        >
          https://cua.dls-archer.com
        </a>
        <p
          className={clsx('text-left mb-0', {
            'text-left': !isSuccess,
            'text-center': isSuccess,
          })}
        >
          {isSuccess
            ? 'Gracias por suscribirte!, pronto estaremos en contacto.'
            : 'Notificarme cuando esté listo'}
        </p>
        <form id="subscribeForm" onSubmit={handleSubmit} hidden={isSuccess}>
          <div className="flex gap-2 bg-white rounded-2xl py-1">
            <input
              id="email"
              type="email"
              className="form-control rounded-2xl px-2 w-full ms-1 border-0 text-dark"
              placeholder="tu e-mail..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              loading={isSubmitLoading}
              className="px-2 py-1 rounded me-1 text-sm"
              type="submit"
            >
              suscribirme
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contruccion;
