import React, { useEffect, useRef } from 'react'
import { NotesAppBar } from './NotesAppBar';
import  {useSelector,useDispatch} from 'react-redux';
import { useForm } from '../../hooks/useForm';
import  { activeNote, startDeletingNote } from '../../actions/notes';

export const NoteScreen = () => {

    const dispatch = useDispatch();
    //active:note -> solo esta renombrando la constante
    const {active:note} = useSelector(state => state.notes);
    const [formValues,handleInputChange,reset] = useForm(note);

    
    const activeId = useRef(note.id);
    
    const {body,title,url}= formValues;
    
    useEffect(() => {
        if(note.id !== activeId.current )
        {
            reset(note);
            activeId.current = note.id;
        }
        
    }, [note,reset]);

    useEffect(() => {
        dispatch(activeNote(formValues.id,{...formValues}))
    }, [formValues,dispatch]);

    const handleDeleteNote = ()=>{
        //console.log(note.id);
       dispatch(startDeletingNote(note.id));
    }
    return (
        <div className='notes__main-content'>
           <NotesAppBar/>
           <div className='notes__content'>
               <input
                 type="text"
                  autoComplete='off'
                  placeholder='Some awsome title'
                  name='title'
                  className='notes__title-input'
                  value={title}
                  onChange={handleInputChange} />
               <textarea
                 placeholder='What happend today?'
                  className='notes__textarea'
                   name="body" id="" cols="30" rows="10"
                   value={body}
                   onChange={handleInputChange}
                   ></textarea>

                {
                    (note.url) 
                    &&
                    (
                        <div className='notes__image'>
                            <img src={note.url} alt="" />
                        </div>
                    )
                }
               


           </div>
           <button className='btn-danger' onClick={handleDeleteNote}>
                Borrar
           </button>
        </div>
    )
}
