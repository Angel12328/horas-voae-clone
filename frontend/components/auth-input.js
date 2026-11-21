'use client';

import { useState } from 'react';
import { createElement } from 'react';
import { EyeIcon, EyeOffIcon } from './icons.js';

/**
 * Campo de entrada reutilizable para los formularios de login.
 * @param {Object} props
 * @param {string} props.label Etiqueta del campo.
 * @param {('text'|'password')} props.type Tipo de input.
 * @param {function} props.onChange Callback con el valor del input.
 * @param {string} props.value Valor actual.
 * @param {string} props.placeholder Placeholder.
 * @param {function} props.icon Componente Icon (EnvelopeIcon, LockIcon, etc.).
 */
export function InputField({ label, type, icon: Icon, value, onChange, placeholder }) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    createElement('div', { className: 'input-group' }, [
      createElement('label', { className: 'input-label', htmlFor: label.toLowerCase() }, label),
      createElement('div', { className: 'input-wrap' }, [
        createElement(Icon, { className: 'icon' }),
        createElement('input', {
          className: 'input-field',
          type: inputType,
          value: value,
          onChange: (e) => onChange(e.target.value),
          placeholder: placeholder,
          'aria-label': label,
          id: label.toLowerCase(),
        }),
        type === 'password' && createElement(
          'button',
          {
            type: 'button',
            className: 'toggle-btn',
            onClick: () => setShowPassword((v) => !v),
          },
          showPassword
            ? createElement(EyeIcon, { className: 'w-4 h-4' })
            : createElement(EyeOffIcon, { className: 'w-4 h-4' })
        ),
      ]),
    ])
  );
}
