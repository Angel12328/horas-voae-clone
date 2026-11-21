'use client';

import { createElement, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const startStudent = () => {
    setMessage('');
    router.push('/auth/login');
  };

  const startEmployee = () => {
    setMessage('');
    router.push('/auth/admin');
  };

  return (
    createElement('main', { className: 'app' }, [
      createElement('div', { className: 'card' }, [
        createElement('div', { className: 'branding' }, [
          createElement('h1', { className: 'logo' }, 'Artículo 140'),
          createElement('p', { className: 'subtitle' }, '¿Eres empleado(a)?'),
          createElement('p', { className: 'helper' }, 'Elige el método de acceso para continuar.'),
        ]),
        createElement('div', { className: 'actions' }, [
          createElement(
            'button',
            { type: 'button', className: 'btn btn-primary', onClick: startStudent },
            'Iniciar sesión como estudiante'
          ),
          createElement(
            'button',
            { type: 'button', className: 'btn btn-secondary', onClick: startEmployee },
            'Iniciar sesión como empleado'
          ),
        ]),
        createElement(
          'p',
          { style: { color: '#b91c1c', marginTop: 10, textAlign: 'center' } },
          message
        ),
      ]),
    ])
  );
}
