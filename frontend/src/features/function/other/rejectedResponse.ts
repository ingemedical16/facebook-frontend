import { PayloadAction } from "@reduxjs/toolkit";
import { ResponseActionPayload } from "../../../types/types";
import resetMessageAndError from "./resteMessageAndError";
type StateType = {
    loading: boolean;
    error: string | null;
    message: string | null;
}
const rejectedResponse = (state:StateType, action: PayloadAction<ResponseActionPayload| undefined>) => {
    resetMessageAndError(state);
        state.loading = false;
        state.error = action.payload?.message || null;
} 

export default rejectedResponse;