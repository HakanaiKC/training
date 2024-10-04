/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Form, useFetcher, useNavigate, useParams } from "react-router-dom";
import { deleteContact, getContact } from "../contact";
import { DestroyContact } from "./destroy";
import productService from "../services/productService";

// export async function loaderContact({ params }: any) {
//   const contact = await getContact(params.contactId);
//   if (!contact) {
//     throw new Response("", {
//       status: 404,
//       statusText: "Not Found",
//     });
//   }
//   return { contact };
// }

// export async function actionContact({ request, params }) {
//   const formData = await request.formData();
//   return updateContact(params.contactId, {
//     favorite: formData.get("favorite") === "true",
//   });
// }

export default function Contact() {
  const [contact, setContact] = useState<any>([]);
  const params = useParams();
  const navigate = useNavigate();

  function handleEdit() {
    navigate("/contacts/edit/" + params.contactId);
  }

  async function handleDelete() {
    await deleteContact(params.contactId);
    navigate("/contacts");
  }

  async function getDetailsContact() {
    const contact = await getContact(params.contactId);

    if (!contact) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    setContact(contact);
  }

  useEffect(() => {
    getDetailsContact();
  }, [params.contactId]);

  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={
            contact.avatar ||
            `https://robohash.org/${contact.id}.png?size=200x200`
          }
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <form>
            <button type="submit" onClick={handleEdit}>
              Edit
            </button>
          </form>
          <div>
            {/* <form
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          > */}
            <button type="submit" onClick={handleDelete}>
              Delete
            </button>
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }: { contact: any }) {
  const fetcher = useFetcher();
  const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : contact.favorite;

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
