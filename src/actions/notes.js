import { db } from "../firebase/firebaseConfig";
import { collection, addDoc,updateDoc,doc,deleteDoc  } from "firebase/firestore";
import {Types} from '../types/Types';
import { loadNotes } from "../helpers/loadNotes";
import Swal from 'sweetalert2'
import { fileUpload } from "../helpers/fileUpload";
export const startNewNote = () =>{
    return  async(dispatch,getState) =>{
        const {uid} = getState().auth;
        //console.log(uid);

        const newNote = {
           title:'',
           body :'',
           date : new Date().getTime()
        }

        const doc = await addDoc(collection(db, `${uid}`,'journal/notes'), newNote);
        //console.log("Document written with ID: ", doc.id);
        dispatch(activeNote(doc.id,newNote));
        dispatch(addNewNote(doc.id,newNote))
    }
}
//React-Journal
export const activeNote = (id,notes)=>({
    type:Types.notesActive,
    payload :{
        id,
        ...notes
    }
});

export const addNewNote = (id,notes)=>({
    type:Types.notesAddNew,
    payload :{
        id,
        ...notes
    }
});

export const startLoadingNotes = (uid) =>{
    return  async(dispatch)=>{
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const setNotes = (notes)=>({
    type:Types.notesLoad,
    payload : notes
});


export const StartSaveNotes = (note)=>{
    return async(dispatch,getState)=>{
        const {uid}=getState().auth;

        if(!note.url)
            delete note.url;

        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        await updateDoc(doc(db,`${uid}/journal/notes/${note.id}`),noteToFirestore).then(() => {
            Swal.fire({
                title: 'Saved!',
                text: note.title,
                icon: 'success',
                //timer:3000,
                confirmButtonColor: '#2E86C1',
                confirmButtonText:'Entendido'
              })           
        })
        .catch((error) => {
            Swal.fire({
                title: 'ups!',
                text: error,
                icon: 'error',
                //timer:3000,
                confirmButtonColor: '#2E86C1',
                confirmButtonText:'Entendido'
              })  

              console.log(error);
        });

        dispatch(refreshNote(note.id,noteToFirestore));
    }
}

export const refreshNote=(id,note)=>({
    type:Types.notesUpdated,
    payload:{
        id,
        note:{
           id,
            ...note
        }
    }

});

export const startUploading =  (file) =>{
    return async (dispatch,getState)=>{
        const {active:activeNote} = getState().notes;
        
        Swal.fire({
            title:'Subiendo Imagen...',
            text : 'Porfavor Espere...',        
            allowOutsideClick:false,
            didOpen : ()=>{
                Swal.showLoading();
            }
            

        });


       const fileUrl = await fileUpload(file);
        console.log(fileUrl);
       Swal.close();
       if(!fileUrl.includes("https://res.cloudinary.com"))
       {
        Swal.fire({
            title: 'ups!',
            text: 'Error al cargar la imagen',
            icon: 'error',
            //timer:3000,
            confirmButtonColor: '#2E86C1',
            confirmButtonText:'Entendido'
          });
       }else{
        activeNote.url=fileUrl;
        dispatch(StartSaveNotes(activeNote));
       }   
       
       

    }

    
}
export const startDeletingNote = (id)=>{
    return async(dispatch,getSate)=>{

        const {uid} = getSate().auth;
        await deleteDoc(doc(db, `${uid}/journal/notes/${id}`));
        dispatch(deleteNote(id));
    }
}

export const deleteNote = (id)=>({
    type:Types.notesDelete,
    payload:id
});

export const logOutNote = ()=>({
    type:Types.notesLogoutCleaning,    
});