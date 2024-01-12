import React from "react";
import Modal from "./Modal";
import { Field, Form, Formik } from "formik";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

const Add_Update_Contact = ({ contact, isUpdate, isOpen, setOpen }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      setOpen(false);
      toast.success("Contact Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  
  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      setOpen(false);
      toast.success("Contact Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} setOpen={setOpen}>
      <Formik
        initialValues={
          isUpdate
            ? {
                name: contact.name,
                email: contact.email,
                mobile: contact.mobile,
              }
            : {
                name: "",
                email: "",
                mobile: "",
              }
        }
        onSubmit={(values) => {
          isUpdate ? updateContact(values, contact.id) : addContact(values);
        }}
      >
        <Form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-medium">
              Name
            </label>
            <Field
              type="name"
              name="name"
              required
              className="border rounded-sm focus:outline-1 focus:outline-black/60 ps-2 p-1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <Field
              type="email"
              name="email"
              required
              className="border rounded-sm focus:outline-1 focus:outline-black/60 ps-2 p-1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="mobile" className="font-medium">
              Mobile No.
            </label>
            <Field
              type="number"
              name="mobile"
              required
              className="border rounded-sm focus:outline-1 focus:outline-black/60 ps-2 p-1"
            />
          </div>
          <button
            type="submit"
            className="bg-orange px-3 py-1.5 border self-end mt-2 rounded-sm font-medium hover:bg-orange/80"
          >
            {isUpdate ? "Update" : "Add"} Contact
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default Add_Update_Contact;
