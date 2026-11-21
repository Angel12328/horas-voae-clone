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
      createElement('div', { className: 'card', key: 'card' }, [
        createElement('div', { className: 'branding', key: 'branding' }, [
          createElement('h1', { className: 'logo', key: 'title' }, 'Artículo 140'),
          createElement('p', { className: 'subtitle', key: 'subtitle' }, '¿Eres empleado(a)?'),
          createElement('p', { className: 'helper', key: 'helper' }, 'Elige el método de acceso para continuar.'),
        ]),
        createElement('div', { className: 'actions', key: 'actions' }, [
          createElement(
            'button',
            { key: 'student', type: 'button', className: 'btn btn-primary', onClick: startStudent },
            'Iniciar sesión como estudiante'
          ),
          createElement(
            'button',
            { key: 'employee', type: 'button', className: 'btn btn-secondary', onClick: startEmployee },
            'Iniciar sesión como empleado'
          ),
        ]),
        createElement(
          'p',
          { key: 'message', style: { color: '#b91c1c', marginTop: 10, textAlign: 'center' } },
          message
        ),
      ]),
    ])
  );
}
