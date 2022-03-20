import React from 'react'
import {useDispatch,useSelector} from 'react-redux';
import { StartSaveNotes, startUploading } from '../../actions/notes';
export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const {active:note} = useSelector(state => state.notes);
    const handleSave = () =>{
        //console.log(note);
        dispatch(StartSaveNotes(note));
    }

    const handlePictureClick = () =>{
      document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e)=>{
        //console.log(e.target.files);
        const file = e.target.files[0];
        if(file)
        {
            dispatch(startUploading(file));
        }
    }
    return (
        <div className='notes__appbar'>
            <span>10 de abril del 2017</span>
            <input 
                id='fileSelector'
                name='file'
                type="file" 
                style={{display:"none"}}
                onChange={handleFileChange}
                />
            <div>
                <button
                 className='btn'
                 onClick={handlePictureClick}>
                    Picture
                </button>
                <button 
                    className='btn'
                    onClick={handleSave}
                    >
                    Save
                </button>
            </div>
        </div>
    )
}
