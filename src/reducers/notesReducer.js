import {Types} from '../types/Types'
const initialState= {
    notes: [],
    active:null
}
export const notesReducer =(state = initialState,action)=>{

    switch (action.type) {
        case Types.notesActive:
            return{
                ...state,
                active:{
                    ...action.payload
                }
            }
        case Types.notesAddNew: 
                return{
                    ...state,
                    notes:[action.payload,...state.notes]
                }
        case Types.notesLoad:
            return{
                ...state,
                notes:[...action.payload]
            }
        case Types.notesUpdated:
            return{
                ...state,
                notes:state.notes.map(
                    note=>note.id === action.payload.id
                          ? action.payload.note
                          : note
                )
            };
        case Types.notesDelete:
            console.log(action.payload);
            return{
                ...state,
                active:null,
                notes :  state.notes.filter(note => note.id !== action.payload)
            }
        case Types.notesLogoutCleaning:
            console.log(action.payload);
            return{
                ...state,
                notes: [],
                active:null
            }

        default:
            return state;
    }
}