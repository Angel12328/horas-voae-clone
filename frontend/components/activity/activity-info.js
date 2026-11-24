'use client';

import { createElement, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, ShareIcon, FingerprintIcon, ChessTrophyIllustration, UsersIcon } from '../icons.js';
import { ConfirmModal } from './confirm-modal.js';
import { LoadingOverlay } from './loading-overlay.js';

const LOADING_MS = 3000;

/**
 * Página "Información de Actividad" (issue "Clonar Informacion de
 * Actividad"). Solo interacción UX: no hay validaciones contra base de
 * datos; el estado de inscripción vive en localStorage por actividad.
 */
export function ActivityInfo({ codigo, activity }) {
  const [carrera, setCarrera] = useState('Tu Carrera');
  const [enrolled, setEnrolled] = useState(false);
  const [modal, setModal] = useState(null); // 'enroll' | 'abandon' | null
  const [modalidad, setModalidad] = useState('');
  const [loadingLabel, setLoadingLabel] = useState(null);
  const [copied, setCopied] = useState(false);
  const [cuposDisponibles, setCuposDisponibles] = useState(activity.cuposModalidad);

  const storageKey = 'inscripcion:' + codigo;

  useEffect(() => {
    // El valor por defecto ya se pintó en el primer render (SSR); esto solo
    // sincroniza con localStorage tras montar en el cliente.
    try {
      const propia = localStorage.getItem('carrera');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (propia) setCarrera(propia);
      setEnrolled(localStorage.getItem(storageKey) === '1');
    } catch (err) {
      // localStorage no disponible; se mantienen los valores por defecto.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setCopied(false);
    }
  };

  const openEnroll = () => {
    setModalidad('');
    setModal('enroll');
  };

  const openAbandon = () => setModal('abandon');

  const closeModal = () => setModal(null);

  const runLoading = (label, after) => {
    setLoadingLabel(label);
    setTimeout(() => {
      setLoadingLabel(null);
      after();
    }, LOADING_MS);
  };

  const confirmEnroll = () => {
    if (!modalidad) return;
    setModal(null);
    runLoading('Inscribiendo a la actividad...', () => {
      setEnrolled(true);
      setCuposDisponibles((n) => Math.max(0, n - 1));
      try {
        localStorage.setItem(storageKey, '1');
      } catch (err) {
        // noop
      }
    });
  };

  const confirmAbandon = () => {
    setModal(null);
    runLoading('Abandonando la actividad...', () => {
      setEnrolled(false);
      setCuposDisponibles((n) => Math.min(activity.cuposModalidad, n + 1));
      try {
        localStorage.removeItem(storageKey);
      } catch (err) {
        // noop
      }
    });
  };

  return createElement('div', { className: 'activity-page' }, [
    createElement('div', { className: 'activity-main', key: 'main' }, [
      createElement(
        Link,
        { key: 'back', href: '/st', className: 'back-link' },
        [createElement(ArrowLeftIcon, { key: 'icon' }), createElement('span', { key: 'label' }, 'Atrás')]
      ),

      createElement('div', { className: 'activity-actions-row', key: 'actions-row' }, [
        enrolled
          ? createElement(
              'button',
              { key: 'abandon', type: 'button', className: 'btn btn-danger btn-pill', onClick: openAbandon },
              [createElement(FingerprintIcon, { key: 'icon' }), createElement('span', { key: 'label' }, 'Abandonar')]
            )
          : createElement(
              'button',
              { key: 'enroll', type: 'button', className: 'btn btn-primary btn-inline', onClick: openEnroll },
              [createElement('span', { key: 'label' }, 'Inscribirse'), createElement(FingerprintIcon, { key: 'icon' })]
            ),
        createElement(
          'button',
          { key: 'share', type: 'button', className: 'btn btn-primary btn-inline', onClick: handleShare },
          [createElement('span', { key: 'label' }, copied ? 'Enlace copiado' : 'Compartir'), createElement(ShareIcon, { key: 'icon' })]
        ),
      ]),

      createElement('div', { className: 'toast-success', key: 'toast' }, [
        createElement('strong', { key: 'carrera' }, carrera),
        createElement(
          'span',
          { key: 'text' },
          enrolled ? ' — ya estás inscrito en esta actividad.' : ' está disponible para inscripción.'
        ),
      ]),

      createElement('h2', { className: 'activity-title', key: 'nombre' }, activity.nombre),

      createElement('section', { className: 'info-section', key: 'info-general' }, [
        createElement('h3', { key: 'title' }, 'Información General'),
        createElement('div', { className: 'info-grid', key: 'grid' }, [
          createElement(InfoField, { key: 'actividad', label: 'Actividad', value: activity.codigo }),
          createElement(InfoField, { key: 'horario', label: 'Horario', value: activity.horario }),
          createElement(InfoField, { key: 'inicio', label: 'Fecha de Inicio', value: activity.fechaInicio }),
          createElement(InfoField, { key: 'fin', label: 'Fecha de Finalización', value: activity.fechaFin }),
          createElement(InfoField, { key: 'tipo', label: 'Tipo de actividad', value: activity.tipo }),
          createElement(InfoField, { key: 'ubicacion', label: 'Ubicación', value: activity.ubicacion }),
        ]),
      ]),

      createElement('section', { className: 'info-section', key: 'modalidades' }, [
        createElement('h3', { key: 'title' }, 'Modalidades de la Actividad'),
        createElement('table', { className: 'activity-table', key: 'table' }, [
          createElement('thead', { key: 'thead' }, [
            createElement('tr', { key: 'row' }, [
              createElement('th', { key: 'm' }, 'Modalidad'),
              createElement('th', { key: 'a' }, 'Asistencias'),
              createElement('th', { key: 'am' }, 'Ámbitos'),
            ]),
          ]),
          createElement('tbody', { key: 'tbody' }, [
            createElement('tr', { key: 'row' }, [
              createElement('td', { key: 'm', className: 'cell-strong' }, activity.modalidad),
              createElement('td', { key: 'a' }, activity.asistencia),
              createElement('td', { key: 'am', className: 'cell-accent' }, activity.ambito),
            ]),
          ]),
        ]),
      ]),

      createElement('section', { className: 'info-section', key: 'entidades' }, [
        createElement('h3', { key: 'title' }, 'Entidades Organizadoras'),
        createElement('table', { className: 'activity-table', key: 'table' }, [
          createElement('thead', { key: 'thead' }, [
            createElement('tr', { key: 'row' }, [
              createElement('th', { key: 'e' }, 'Entidad Organizadora'),
              createElement('th', { key: 'r' }, 'Roles de la Entidad'),
            ]),
          ]),
          createElement('tbody', { key: 'tbody' }, [
            createElement('tr', { key: 'row' }, [
              createElement('td', { key: 'e' }, activity.entidad),
              createElement('td', { key: 'r' }, activity.rolEntidad),
            ]),
          ]),
        ]),
      ]),
    ]),

    createElement('aside', { className: 'activity-aside', key: 'aside' }, [
      createElement('div', { className: 'cupos-card', key: 'cupos-card' }, [
        createElement('div', { className: 'cupos-card-header', key: 'header' }, [
          createElement(UsersIcon, { key: 'icon' }),
          createElement('span', { key: 'label' }, 'Cupos Disponibles'),
        ]),
        createElement('div', { className: 'cupos-box', key: 'box' }, [
          createElement('div', { className: 'cupos-modalidad', key: 'modalidad' }, activity.modalidad),
          createElement('div', { className: 'cupos-count', key: 'count' }, cuposDisponibles + ' disponibles'),
        ]),
      ]),
      createElement('div', { className: 'qr-carousel', key: 'qr-carousel' }, [
        createElement(
          'button',
          { key: 'prev', type: 'button', className: 'qr-nav qr-nav-prev', tabIndex: -1, 'aria-hidden': true },
          [createElement(ArrowLeftIcon, { key: 'icon', className: 'w-4 h-4' })]
        ),
        createElement(
          Link,
          { key: 'qr', href: '/alert', className: 'qr-box', title: 'Más información' },
          [createElement(ChessTrophyIllustration, { key: 'illustration' })]
        ),
        createElement(
          'button',
          { key: 'next', type: 'button', className: 'qr-nav qr-nav-next', tabIndex: -1, 'aria-hidden': true },
          [createElement(ArrowLeftIcon, { key: 'icon', className: 'w-4 h-4' })]
        ),
      ]),
      createElement('section', { className: 'aside-description', key: 'descripcion' }, [
        createElement('h3', { key: 'title' }, 'Descripción de la actividad'),
        createElement('p', { key: 'text' }, activity.descripcion),
      ]),
    ]),

    modal === 'enroll' &&
      createElement(ConfirmModal, {
        key: 'enroll-modal',
        title: 'Inscribirse a la Actividad',
        question: '¿Desea ingresar en la actividad?',
        selectLabel: 'Seleccione en que modalidad ingresará',
        selectOptions: [{ value: 'presencial', label: activity.modalidad + ' - ' + activity.cuposModalidad + ' cupos' }],
        selectValue: modalidad,
        onSelectChange: setModalidad,
        onConfirm: confirmEnroll,
        onCancel: closeModal,
        confirmDisabled: !modalidad,
      }),

    modal === 'abandon' &&
      createElement(ConfirmModal, {
        key: 'abandon-modal',
        title: 'Abandonar la Actividad',
        question: '¿Desea abandonar la actividad? Perderá su cupo asignado.',
        onConfirm: confirmAbandon,
        onCancel: closeModal,
      }),

    loadingLabel && createElement(LoadingOverlay, { key: 'loading', label: loadingLabel }),
  ]);
}

function InfoField({ label, value }) {
  return createElement('div', { className: 'info-field' }, [
    createElement('span', { className: 'info-field-label', key: 'label' }, label),
    createElement('span', { className: 'info-field-value', key: 'value' }, value),
  ]);
}
