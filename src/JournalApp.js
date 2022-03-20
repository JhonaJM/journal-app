import React from 'react'
import { AppRouter } from './routers/AppRouter'
import { BrowserRouter  } from "react-router-dom";
import {Provider} from 'react-redux'
import {store} from '../src/store/Store';

export const JournalApp = () => {
    return (
        <Provider store={store}>        
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </Provider>
    )
}
