import { InjectionToken } from '@angular/core';
import { Notyf } from 'notyf';

export const NOTYF = new InjectionToken<Notyf>('NotyfToken');

export function notyfFactory(): Notyf {
  return new Notyf({
    duration: 3500,
    position: { x: 'right', y: 'top' },
    dismissible: true,
    types: [
      {
        type: 'warning',
        background: 'orange',
        icon: {
          className: 'notyf__icon--error',
          tagName: 'i',
        },
      },
      {
        type: 'info',
        background: '#1E90FF',
        icon: false,
      },
      {
        type: 'error',
        background: '#dc3545',
        duration: 3500,
        dismissible: true,
        icon: {
          className: 'notyf__icon--error',
          tagName: 'i',
        },
      },
      {
        type: 'success',
        background: '#28a745',
        duration: 3500,
        dismissible: true,
      },
    ],
  });
}
