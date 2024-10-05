/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { getContact, getContacts, updateContact } from "../contact";
import { useContext, useEffect, useState } from "react";
import { useContact } from "./root";
import { AppContext } from "../context/AppContext";

// export async function actionEdit({ request, params }: any) {
//   const formData = await request.formData();
//   const updates = Object.fromEntries(formData);
//   await updateContact(params.contactId, updates);
//   return redirect(`/contacts/${params.contactId}`);
// }
interface Contact {
  id: string;
  createdAt: number;
  firstname: string;
  lastname: string;
  twitter: string;
  avatar: string;
  notes: string;
}
export default function EditContact() {
  const navigate = useNavigate();
  const params = useParams();
  const { contacts, setContacts: setListContacts } = useContact();
  const {dataProducts} = useContext(AppContext)
  console.log(dataProducts);

  const [contact, setContact] = useState<Contact | any>({
    id: "",
    createdAt: 0,
    firstname: "",
    lastname: "",
    twitter: "",
    avatar: "",
    notes: "",
  });

  async function handleSave(event: any) {
    event.preventDefault();
    const userInfo = {
      first: contact.first,
      last: contact.last,
      twitter: contact.twitter,
      avatar: contact.avatar,
      notes: contact.notes,
    };

    await updateContact(params.contactId, userInfo);
    handleGetListContacts();
    setContact(userInfo);

    navigate(`/contacts/${params.contactId}`);
  }

  async function handleGetListContacts() {
    const listContacts = await getContacts();
    console.log(listContacts);
    setListContacts(listContacts);
  }
  async function fetchContact() {
    const contactData = await getContact(params.contactId);
    console.log(contactData);

    setContact(contactData);
  }

  useEffect(() => {
    fetchContact();
  }, [params.contactId]);

  const handleChangeContact = (data: any) => {
    console.log({ ...contact, [data.target.name]: data.target.value });
    setContact({ ...contact, [data.target.name]: data.target.value });
  };

  return (
    <form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          onChange={(e) => handleChangeContact(e)}
          defaultValue={contact?.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          onChange={(e) => handleChangeContact(e)}
          defaultValue={contact?.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          onChange={(e) => handleChangeContact(e)}
          defaultValue={contact?.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          onChange={(e) => handleChangeContact(e)}
          defaultValue={contact?.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact?.notes}
          rows={6}
          onChange={(e) => handleChangeContact(e)}
        />
      </label>
      <p>
        <button onClick={handleSave}>Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </form>
  );
}
