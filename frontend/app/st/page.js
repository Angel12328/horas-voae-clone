
import { createElement } from 'react';
import ActividadesClient from './actividades-client';
import './actividades.css';

export const instant = false;

export default function StudentPanel() {
  return createElement(ActividadesClient);
}
