export const resetMessageAndError = (state: {
    message: string | null;
    error: string | null;
  }): void => {
    state.message = null;
    state.error = null;
  };
  