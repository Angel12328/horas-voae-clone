'use client';

import { createElement, useState } from 'react';
import Link from 'next/link';
import { InputField } from '../../../components/auth-input.js';
import { EnvelopeIcon, LockIcon } from '../../../components/icons.js';

export default function StudentLoginPage() {
  const [cuenta, setCuenta] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [alerta, setAlerta] = useState(false);
  const [alertaMsg, setAlertaMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setAlerta(false);
    try {
      const res = await fetch('http://localhost:4000/api/student-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cuenta, contrasenia }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Error al guardar la informacion.');
        return;
      }
      localStorage.setItem('cuenta', cuenta);
      setAlerta(true);
      setAlertaMsg('Cuenta registrada con éxito. Hemos simulado el acceso a /st (sección estudiante pendiente de otra issue).');
    } catch (err) {
      setError('No se pudo conectar con el backend.');
    } finally {
      setSubmitting(false);
    }
  };

  return createElement('main', { className: 'app' }, [
    createElement('div', { className: 'card', key: 'card' }, [
      createElement('div', { className: 'branding', key: 'branding' }, [
        createElement('h1', { className: 'logo', key: 'title' }, 'Artículo 140'),
        createElement('p', { className: 'subtitle', key: 'subtitle' }, 'Ingresa como Estudiante'),
        createElement('p', { className: 'helper', key: 'helper' }, 'Ingresa tus datos para acceder a la plataforma.'),
      ]),
      createElement('form', { onSubmit: handleSubmit, noValidate: true, key: 'form' }, [
        createElement(InputField, {
          key: 'cuenta',
          label: 'No. de Cuenta',
          type: 'text',
          icon: EnvelopeIcon,
          value: cuenta,
          onChange: setCuenta,
          placeholder: 'Ingresa tu cuenta',
        }),
        createElement(InputField, {
          key: 'contrasenia',
          label: 'Contraseña',
          type: 'password',
          icon: LockIcon,
          value: contrasenia,
          onChange: setContrasenia,
          placeholder: '••••••••',
        }),
        (error) &&
          createElement('p', { key: 'error', style: { color: '#b91c1c', margin: '0 0 10px', textAlign: 'left' } }, error),
        createElement(
          'button',
          { key: 'submit', type: 'submit', className: 'btn btn-primary', disabled: submitting },
          submitting ? 'Conectando...' : 'Iniciar Sesión'
        ),
        createElement(
          Link,
          { key: 'admin-link', href: '/auth/admin', className: 'btn btn-secondary' },
          '¿Eres empleado (a)?, Ingresa aquí'
        ),
      ]),
      (alerta) &&
        createElement('div', { className: 'alerta', key: 'alerta' }, [
          createElement('strong', { key: 'nota' }, 'Nota: '),
          createElement('span', { key: 'mensaje' }, alertaMsg),
          createElement('div', { key: 'st-note', style: { fontSize: '0.85em', color: '#713F12', textAlign: 'left' } }, 'La ruta /st queda pendiente para otra issue. Usa /auth/login para volver atrás.'),
        ]),
    ]),
  ]);
}
