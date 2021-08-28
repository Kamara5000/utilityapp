import React, { useEffect, useState } from 'react';
import axios from  'axios';

const Contacts = ()=>{
const [contacts, handleContacts] = useState(null);
const [filter, handleFilter] = useState(null);

useEffect(()=>{
if (filter) {
    axios.get('https://randomuser.me/api?results=200').then(res=>{
        //console.log(res.data);
        const query = filter.toLowerCase();
        const filtered = res.data.results.filter(contact=>{
            const fullName = `${contact.name.first} ${contact.name.last}`;
            if(query.length === 1){
                const firstLetter = fullName.charAt(0).toLowerCase();
                return firstLetter === query
            }else{
                return fullName.toLowerCase().includes(query);
            }
        })

        handleContacts(filtered);
    }).catch(err=>{console.log(err)})
 
    
    
} else {
    axios.get('https://randomuser.me/api?results=200').then(res=>{
        //console.log(res.data);
        handleContacts(res.data.results);
    
    }
).catch(err=>{console.log(err)})

    
}


},[filter])

console.log(contacts);

    return(
        <React.Fragment>
            <section>
            <form>
               <input placeholder="find a contact" type="text" className="ml-20 mt-10 rounded-md p-2"
                onChange={event => handleFilter(event.target.value)}/>
           </form>
                </section>
                
            <section className="grid md:grid-cols-4 sm:grid-cols-2 gap-6 p-10 md:p-20 lg:p-20">
                {contacts?contacts.map((c,i)=>(
                <figure key={i} className="bg-white h-70 rounded-lg shadow-md pt-6">
                    <img alt="img" className="w-32 h-32 rounded-full mx-auto"  src={c.picture.large}/>
                    <figcaption className="text-center mt-5">
                    <p className="text-gray-700 font-semibold text-xl mb-2">{c.name.first} {c.name.last}</p>
                    <p className="text-gray-500 "><span className="font-medium">email:</span>{c.email}</p>
                    <p className="text-gray-500"><span className="font-medium">phone:</span> {c.cell}</p>
                    <p className="text-gray-500"><span className="font-medium">city:</span> {c.location.city}</p>
                    </figcaption>

                </figure>
            )):<div className="text-red-400">no contact available</div>
            }
            </section>
            
            
        </React.Fragment>
    )
}

export default Contacts;