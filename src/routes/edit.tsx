/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { getContact, getContacts, updateContact } from "../contact";
import { useEffect, useState } from "react";

// export async function actionEdit({ request, params }: any) {
//   const formData = await request.formData();
//   const updates = Object.fromEntries(formData);
//   await updateContact(params.contactId, updates);
//   return redirect(`/contacts/${params.contactId}`);
// }

export default function EditContact() {
  const navigate = useNavigate();
  const params = useParams();

  const [contact, setContact] = useState<any>({});
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [avatarURL, setAvatarURL] = useState<string>("");
  const [notes, setNote] = useState<string>("");

  async function handleSave(event: any) {
    event.preventDefault();
    const userInfo = {
      first: firstname,
      last: lastname,
      twitter: twitter,
      avatar: avatarURL,
      notes: notes,
    };
    setContact(userInfo);
    await updateContact(params.contactId, userInfo);
    navigate(`/contacts/${params.contactId}`);
  }

  useEffect(() => {
    async function fetchContact() {
      const contactData = await getContact(params.contactId);
      setContact(contactData);
      setFirstname(contactData.first);
      setLastname(contactData.last);
      setTwitter(contactData.twitter);
      setAvatarURL(contactData.avatar);
      setNote(contactData.notes);
    }

    fetchContact();
  }, [params.contactId]);

  return (
    <form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          onChange={(e) => setFirstname(e.target.value)}
          defaultValue={contact?.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          onChange={(e) => setLastname(e.target.value)}
          defaultValue={contact?.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          onChange={(e) => setTwitter(e.target.value)}
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
          onChange={(e) => setAvatarURL(e.target.value)}
          defaultValue={contact?.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact?.notes}
          rows={6}
          onChange={(e) => setNote(e.target.value)}
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
