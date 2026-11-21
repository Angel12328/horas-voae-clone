'use client';

import { createElement, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { InputField } from '../../../components/auth-input.js';
import { EnvelopeIcon, LockIcon } from '../../../components/icons.js';

export default function AdminLoginPage() {
  const router = useRouter();
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    // La sección de empleado está en mantenimiento: solo redirige a /error.
    // No se capturan ni se envían datos al servidor.
    router.push('/error');
    setSubmitting(false);
  };

  return (
    createElement('main', { className: 'app' }, [
      createElement('div', { className: 'card' }, [
        createElement('div', { className: 'branding' }, [
          createElement('h1', { className: 'logo' }, 'Artículo 140'),
          createElement('p', { className: 'subtitle' }, 'Ingrese como Empleado'),
          createElement('p', { className: 'helper' }, 'Ingrese sus datos para acceder a la plataforma.'),
        ]),
        createElement('form', { onSubmit: handleSubmit, noValidate: true }, [
          createElement(InputField, {
            label: 'Correo Institucional',
            type: 'text',
            icon: EnvelopeIcon,
            value: correo,
            onChange: setCorreo,
            placeholder: 'correo@institucion.edu',
          }),
          createElement(InputField, {
            label: 'Contraseña',
            type: 'password',
            icon: LockIcon,
            value: contrasenia,
            onChange: setContrasenia,
            placeholder: '••••••••',
          }),
          createElement(
            'p',
            { style: { margin: '0 0 10px' } },
            createElement(
              'a',
              { href: '#', className: 'link' },
              '¿Ha olvidado su contraseña?'
            )
          ),
          (error) &&
            createElement('p', { style: { color: '#b91c1c', margin: '0 0 10px', textAlign: 'left' } }, error),
          createElement(
            'button',
            { type: 'submit', className: 'btn btn-primary', disabled: submitting },
            submitting ? 'Conectando...' : 'Iniciar Sesión'
          ),
          createElement(
            Link,
            { href: '/auth/login', className: 'btn btn-link' },
            '¿Es estudiante? Ingrese aquí'
          ),
        ]),
      ]),
    ])
  );
}
