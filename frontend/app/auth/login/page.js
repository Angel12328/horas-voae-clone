"use client";

import { createElement, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { InputField } from '../../../components/auth-input.js';
import { EnvelopeIcon, LockIcon } from '../../../components/icons.js';

export default function StudentLoginPage() {
  const router = useRouter();
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
      // Guardar la cuenta; la seccion /st queda pendiente (otra issue)
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
    createElement('div', { className: 'card' }, [
      createElement('div', { className: 'branding' }, [
        createElement('h1', { className: 'logo' }, 'Artículo 140'),
        createElement('p', { className: 'subtitle' }, 'Ingresa como Estudiante'),
        createElement('p', { className: 'helper' }, 'Ingresa tus datos para acceder a la plataforma.'),
      ]),
      createElement('form', { onSubmit: handleSubmit, noValidate: true }, [
        createElement(InputField, {
          label: 'No. de Cuenta',
          type: 'text',
          icon: EnvelopeIcon,
          value: cuenta,
          onChange: setCuenta,
          placeholder: '20201900397',
        }),
        createElement(InputField, {
          label: 'Contraseña',
          type: 'password',
          icon: LockIcon,
          value: contrasenia,
          onChange: setContrasenia,
          placeholder: '••••••••',
        }),
        (error) &&
          createElement('p', { style: { color: '#b91c1c', margin: '0 0 10px', textAlign: 'left' } }, error),
        createElement(
          'button',
          { type: 'submit', className: 'btn btn-primary', disabled: submitting },
          submitting ? 'Conectando...' : 'Iniciar Sesión'
        ),
        createElement(
          Link,
          { href: '/auth/admin', className: 'btn btn-link' },
          '¿Eres empleado(a)? Ingresa aquí'
        ),
      ]),
    ]),
    (alerta) &&
      createElement('div', { className: 'alerta' }, [
        createElement('div', { style: { marginBottom: 8 } }, '⚠️ ' + alertaMsg),
        createElement('div', { style: { fontSize: '0.85em', color: '#6b7280', textAlign: 'left' } }, 'La ruta /st queda pendiente para otra issue. Usa /auth/login para volver atrás.'),
      ]),
  ]);
}
