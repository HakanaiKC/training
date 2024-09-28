/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Outlet,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  useSubmit,
  useOutlet,
} from "react-router-dom";
import { createContact, getContacts } from "../contact";
import { useEffect, useState } from "react";
import "./root.css";

// export async function loader({ request }) {
//   const url = new URL(request.url);
//   const q = url.searchParams.get("q");
//   const contacts = await getContacts(q);
//   return { contacts, q };
// }

// export async function action() {
//   const contact = await createContact();
//   return redirect(`/contacts/${contact.id}/edit`);
// }

export default function Root() {
  const navigation = useNavigation();
  const submit = useSubmit();
  const [contacts, setContacts] = useState<any>([]);
  const [q, setQ] = useState<any>(null);

  async function handleGetListContacts() {
    const contacts = await getContacts();
    setContacts(contacts);
  }

  async function handleCreateData() {
    const contact = await createContact();
    console.log(contact);
    handleGetListContacts();
  }

  useEffect(() => {
    handleGetListContacts();
  }, [contacts]);

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  return (
    <div className="root">
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              className={searching ? "loading" : ""}
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
                setQ(event.target.value);
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <div>
            <button onClick={handleCreateData}>New</button>
          </div>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact: any) => (
                <li key={contact.id}>
                  <NavLink
                    to={`/contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </div>
  );
}
