import { HttpErrorResponse } from '@angular/common/http';

export function getErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    const apiMessage = getApiMessage(error.error);

    if (apiMessage) {
      return apiMessage;
    }

    if (error.status === 0) {
      return 'No fue posible conectar con el backend. Verifica que la API esté en ejecución.';
    }

    return `Ocurrió un error al procesar la solicitud. Código: ${error.status}.`;
  }

  return 'Ocurrió un error inesperado.';
}

function getApiMessage(error: unknown): string | null {
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }

  return null;
}