import React from 'react';
import moment from 'moment';
import {useDispatch} from 'react-redux'
import { activeNote } from '../../actions/notes';
export const JournalEntry = ({id,title,date,body,url}) => {
    const dispatch = useDispatch();
    const noDate= moment(date);
    
    const handleEntryClick = ()=>{
        dispatch(
            activeNote(id,{
                title,date,body,url
            }));
        }
    return (
        <div className='journal__entry pointer' onClick={handleEntryClick}>
            <div className='journal__entry-picture'
             style={{
                backgroundSize:'cover',
                backgroundImage: url ?`url(${url})` :'url(https://st.depositphotos.com/1020341/4233/i/450/depositphotos_42333899-stock-photo-portrait-of-huge-beautiful-male.jpg)'
                }}
             >
            </div>

            
            <div className='journal__entry-body'>
                <p className='journal__entry-title'>
                   {title}
                </p>
                <p className='journal__entry-content'>
                  {body}
                </p>
            </div>

            <div className='journal__entry-date-box'>
                <span>{noDate.format("ddd")}</span>
                <h4>{noDate.format("Do")}</h4>
            </div>

        </div>
    )
}
