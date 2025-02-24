type AuthErrorEventDetail = {
  message: string;
};

export const AUTH_ERROR_EVENT = 'auth-error';

export const emitAuthError = (message: string) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent<AuthErrorEventDetail>(AUTH_ERROR_EVENT, {
        detail: { message },
      })
    );
  }
};
