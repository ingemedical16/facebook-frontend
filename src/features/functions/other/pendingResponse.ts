import resetMessageAndError from "./resteMessageAndError";
type StateType = {
  loading: boolean;
  error: string | null;
  message: string | null;
};
const pendingResponse = (state: StateType) => {
  resetMessageAndError(state);
  state.loading = true;
  state.error = null;
};

export default pendingResponse;
