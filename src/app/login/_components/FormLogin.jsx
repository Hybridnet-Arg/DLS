'use client';
import Image from 'next/image';
import { Form, Formik } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ReCAPTCHA from 'react-google-recaptcha';
import { signIn } from 'next-auth/react';
import { Fragment, useEffect, useState } from 'react';

import { showToastError } from '@/utils/showToast.util';
import Button from '@/components/ui/buttons/Button';
import InputField from '@/components/ui/inputs/Input';
import Procesando from '@/components/icons/procesando';
import packageJSON from '../../../../package.json';
import { CONFIG } from '@/constants';

export default function FormLogin() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoadingOnFinish, setIsLoadingOnFinish] = useState(false);
  const [captcha, setCaptcha] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  async function handleOnFinish(data) {
    setIsLoadingOnFinish(true);
    try {
      if (CONFIG.RECAPTCHA.SITE_KEY && !captcha) {
        showToastError('Por favor, verifica que no eres un robot', {
          duration: 2000,
        });
        return;
      }

      const credentials = {
        ...data,
        callbackUrl: '/',
      };
      await signIn('credentials', credentials);
    } catch (error) {
      showToastError('Usuario o contraseña incorrectos');
    } finally {
      setIsLoadingOnFinish(false);
    }
  }

  function handleValidation(values) {
    const errors = {};
    if (!values.username) {
      errors.username = 'El nombre de usuario es requerido';
    }
    if (!values.password) {
      errors.password = 'La contraseña es requerida';
    }
    return errors;
  }

  const handleCaptchaChange = (value) => {
    setCaptcha(value);
  };

  return !isMounted ? (
    <div className="flex justify-center items-center h-screen">
      <Procesando />
    </div>
  ) : (
    <Fragment>
      <div className="">
        <h1 className="text-white font-medium text-3xl">DMS</h1>
        <h2 className="text-white font-medium text-3xl">
          Drilling Management System
        </h2>
        <p className="text-sm text-right text-white px-5 uppercase tracking-[0.17rem] my-2">
          {packageJSON?.version && `Versión ${packageJSON?.version}`}
        </p>
      </div>
      <div className="flex gap-5 mb-20">
        <div className="mt-[3.3rem]">
          <Image
            src={'/static/images/login/dls-archer-logo.png'}
            width={150}
            height={150}
            alt={'logo'}
            unoptimized
          />
        </div>
        <Formik
          initialValues={{}}
          validate={handleValidation}
          onSubmit={(data) => handleOnFinish(data)}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
            <Form onSubmit={handleSubmit}>
              <h1 className="text-[#E4E4E4] text-xl font-base">Login</h1>
              <InputField
                id="username"
                name="username"
                disabled={false}
                onChange={(event) => {
                  handleChange(event);
                }}
                inputStyles="mt-7 px-4 text-base py-2 bg-[#E4E4E4] focus:bg-[#E4E4E4]"
                errorStyles="mt-2"
                onBlur={handleBlur}
                value={values?.username}
                error={errors?.username}
              />
              <div className="relative">
                <InputField
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  disabled={false}
                  errorStyles="mt-2"
                  onChange={(event) => {
                    handleChange(event);
                  }}
                  inputStyles="mt-7 ps-4 pe-8 text-base py-2 bg-[#E4E4E4]"
                  onBlur={handleBlur}
                  value={values?.password}
                  error={errors?.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute bottom-3 right-2 flex items-center"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              <div className="mt-5 w-full flex justify-end">
                {CONFIG.RECAPTCHA.SITE_KEY && (
                  <ReCAPTCHA
                    sitekey={CONFIG.RECAPTCHA.SITE_KEY}
                    onChange={handleCaptchaChange}
                    size="compact"
                  />
                )}
              </div>
              <div className="flex flex-col items-end">
                <Button
                  loading={isLoadingOnFinish}
                  type="submit"
                  labelStyles="text-dark px-7 text-base"
                  disabledStyles="cursor-not-allowed opacity-80"
                  loadingProps={{ className: 'text-dark animate-spin' }}
                  backgroundColor="bg-yellow-400"
                  className="mt-5 font-medium hover:bg-yellow-400 text-black rounded-xl shadow-md shadow-gray-900"
                >
                  sign in
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Fragment>
  );
}
