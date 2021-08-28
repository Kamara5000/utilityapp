import React from 'react';
import Contacts from './contact';
import SearchContacts from './searchcontact';

const Allcontact = ()=>{
    return(
        <React.Fragment>
            <div className="bg-gray-100">
                <Contacts/>
            </div>
        </React.Fragment>
    )
}

export default Allcontact;