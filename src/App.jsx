import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import Contact from "./components/Contact";
import Add_Update_Contact from "./components/Add_Update_Contact";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./components/NotFound";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const getContact = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });
      } catch (error) {}
    };
    getContact();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "contacts");
    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );
      setContacts(filteredContacts);
      return filteredContacts;
    });
  };

  return (
    <>
      <div className="mx-auto max-w-[400px] px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="flex text-white relative items-center flex-grow">
            <FiSearch className="text-2xl absolute ml-2" />
            <input
              onChange={filterContacts}
              type="text"
              className="bg-transparent border border-white rounded-md h-10 flex-grow font-medium focus:outline-1 focus:outline-[#a0a0a0] pl-10 text-[18px]"
            />
          </div>
          <AiFillPlusCircle
            className="text-white text-[2.5rem] cursor-pointer"
            onClick={() => {
              setOpen(true);
            }}
          />
        </div>
        <div className="mt-5">
          {contacts.length > 0 ? (
            contacts.map((item) => {
              return <Contact key={item.id} value={item} />;
            })
          ) : (
            <NotFound />
          )}
        </div>
      </div>
      <Add_Update_Contact isOpen={isOpen} setOpen={setOpen} />
      <ToastContainer position="bottom-center" theme="dark" autoClose="2000" />
    </>
  );
};

export default App;
