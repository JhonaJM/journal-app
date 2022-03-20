import { db } from "../firebase/firebaseConfig";
import { collection,getDocs} from "firebase/firestore";
export const loadNotes = async (uid)=>{

    const notes=[];
    const docSnap = await getDocs(collection(db, `${uid}`,'journal/notes' ));
    
     docSnap.forEach(snapHijo => {
        // console.log(snapHijo);
        notes.push({
            id:snapHijo.id,
            ...snapHijo.data()
        });
     });
    // const docSnap = await getDocs(query(collection(db, `${uid}`,'journal/notes') ));
    
    //  docSnap.forEach(snapHijo => {
    //     // console.log(snapHijo);
    //     notes.push({
    //         id:snapHijo.id,
    //         ...snapHijo.data()
    //     });
    //  });
    
     

    return notes;
}