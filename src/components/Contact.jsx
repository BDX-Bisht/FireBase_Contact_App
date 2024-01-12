import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { db } from "../config/firebase";
import Add_Update_Contact from "./Add_Update_Contact";
import { toast } from "react-toastify";

const Contact = ({ value }) => {
  const [isOpen, setOpen] = useState(false);

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.warning("Contact Deleted Successfully")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-yellow rounded-lg mt-3 flex justify-between p-2">
      <div className="flex gap-2">
        <HiOutlineUserCircle className="text-orange text-4xl cursor-pointer" />
        <div>
          <h2 className="text-lg font-bold">{value.name}</h2>
          <p className="text-[14px] font-semibold">{value.email}</p>
          <p className="text-[14px] font-semibold">+91 {value.mobile}</p>
        </div>
      </div>
      <div className="flex gap-2 text-3xl">
        <TbEdit
          className="cursor-pointer"
          onClick={() => {
            setOpen(true);
          }}
        />
        <IoMdTrash
          className="text-red cursor-pointer"
          onClick={() => deleteContact(value.id)}
        />
      </div>
      <Add_Update_Contact
        isUpdate
        contact={value}
        isOpen={isOpen}
        setOpen={setOpen}
      />
    </div>
  );
};

export default Contact;
