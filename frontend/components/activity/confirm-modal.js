'use client';

import { createElement } from 'react';

/**
 * Modal genérico de confirmación, reutilizado para "Inscribirse" (con
 * selector de modalidad) y "Abandonar" (sin selector), según insAct.png.
 */
export function ConfirmModal({
  title,
  question,
  selectLabel,
  selectOptions,
  selectValue,
  onSelectChange,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
  confirmDisabled = false,
}) {
  return createElement(
    'div',
    { className: 'modal-overlay', role: 'dialog', 'aria-modal': true },
    [
      createElement('div', { className: 'modal-card', key: 'card' }, [
        createElement(
          'button',
          { key: 'close', type: 'button', className: 'modal-close', onClick: onCancel, 'aria-label': 'Cerrar' },
          '×'
        ),
        createElement('h2', { className: 'modal-title', key: 'title' }, title),
        createElement('p', { className: 'modal-question', key: 'question' }, question),
        selectOptions &&
          createElement('div', { className: 'modal-select-group', key: 'select-group' }, [
            createElement('label', { className: 'modal-select-label', key: 'label', htmlFor: 'modalidad' }, selectLabel),
            createElement(
              'select',
              {
                key: 'select',
                id: 'modalidad',
                className: 'select-field',
                value: selectValue,
                onChange: (e) => onSelectChange(e.target.value),
              },
              [
                createElement('option', { key: 'placeholder', value: '' }, 'Seleccione una modalidad'),
                ...selectOptions.map((opt) =>
                  createElement('option', { key: opt.value, value: opt.value }, opt.label)
                ),
              ]
            ),
          ]),
        createElement('div', { className: 'modal-actions', key: 'actions' }, [
          createElement(
            'button',
            {
              key: 'confirm',
              type: 'button',
              className: 'btn btn-confirm',
              onClick: onConfirm,
              disabled: confirmDisabled,
            },
            confirmLabel
          ),
          createElement(
            'button',
            { key: 'cancel', type: 'button', className: 'btn btn-cancel', onClick: onCancel },
            cancelLabel
          ),
        ]),
      ]),
    ]
  );
}
