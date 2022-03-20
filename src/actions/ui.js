import { Types } from "../types/Types";

export const setError =(err)=>({
    type:Types.uiSetError,
    payload:err
})

export const RemoveError =()=>({
    type:Types.uiRemoveError,
})

export const StartLoading =()=>({
    type:Types.uiStartLoading,
    
})

export const FinishLoading =()=>({
    type:Types.uiFinishLoading,
})