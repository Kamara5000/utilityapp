import React, { useEffect, useState } from 'react';
import axios from  'axios';
import { AnimatePresence } from 'framer-motion';
import {motion} from 'framer-motion';
import ContactModal from './contactmodal';

const Contacts = ()=>{
const [contacts, handleContacts] = useState(null);
const [filter, handleFilter] = useState(null);
const [filterered, handleFilterered] = useState(null);
const [selectedContact, handleSelectedContact] = useState(null);
const [isLoad, handleLoading] = useState(true);

useEffect(()=>{
    if (filter) {
        handleLoading(true);
        axios.get('https://randomuser.me/api?results=50').then(res=>{
            console.log(res);
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
            handleLoading(false);
            }).catch(err=>{
            console.log(err);
        })
    } else {
            axios.get('https://randomuser.me/api?results=200').then(res=>{
            console.log(res);
            handleContacts(res.data.results);
            handleLoading(false);
            }).catch(err=>{
            console.log(err)})
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
           <div className="mt-2 self-center font-semibold text-xl text-gray-900 text-center">
               {contacts? contacts.length > 0 ? <h>{contacts.length} results</h>:'':'' }   
            </div>
           
            </section>
            
            <section className="grid md:grid-cols-4 sm:grid-cols-2 gap-6 p-10 md:p-20 lg:p-20">
            {isLoad?<h1>Fetching data...</h1>:
                contacts?contacts.map((c,i)=>(
                    <motion.button
                    //to add transition to the cards
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5, delay:i/10}}
                        drag={false}
                        dragElastic={1}
                        dragConstraints={{ top: 1, bottom: 1, right: 1, left: 1 }}
                        className="bg-white text-white h-80 rounded-lg shadow-md"
                        key={i}
                        onClick={() => handleSelectedContact(c)}
                    >
                  
                        <img alt="img" className="w-32 h-32 rounded-full mx-auto"  src={c.picture.large}/>
                        <figcaption className="text-center mt-5">
                        <p className="text-gray-700 font-semibold text-xl mb-2">{c.name.first} {c.name.last}</p>
                        <p className="text-gray-500 "><span className="font-medium">email:</span><span className="font-medium text-sm">{c.email}</span></p>
                        <p className="text-gray-500"><span className="font-medium">phone:</span> {c.cell}</p>
                        <p className="text-gray-500"><span className="font-medium">city:</span> {c.location.city}</p>
                        
                        </figcaption>
                    </motion.button>
                )):<div className="text-red-400">no contact available</div>
            }
            {contacts? contacts.length < 1 ? <h>can't find contact</h>:'':'' }
                
            </section>

                {/* to all transition to the modal when closed*/}
            <AnimatePresence>
            {selectedContact &&
             <ContactModal
                contact={selectedContact}
                setSelectedContact={handleSelectedContact}
             />
            }
            </AnimatePresence>
            
            
        </React.Fragment>
    )
}

export default Contacts;