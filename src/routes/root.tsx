/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Outlet,
  NavLink,
  useNavigation,
  useOutletContext,
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
type ContextType = { contacts: any; setContacts: any };

export default function Root() {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState<any>([]);

  async function handleGetListContacts() {
    const contacts = await getContacts();
    setContacts(contacts);
  }

  async function handleCreateData() {
    const contact = await createContact();
    console.log(contact);
    handleGetListContacts();
  }

  async function handleSearch(params) {
    const search = await getContacts(params);
    console.log(search);

    setContacts(search);
  }

  useEffect(() => {
    handleGetListContacts();
  }, []);

  // const searching =
  //   navigation.location &&
  //   new URLSearchParams(navigation.location.search).has("q");

  return (
    <div className="root">
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              onChange={(e) => handleSearch(e.target.value)}
            />
            {/* <div id="search-spinner" aria-hidden hidden={!searching} /> */}
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
          <NavLink to={"/products"}>Check Products</NavLink>
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet context={{ contacts, setContacts } satisfies ContextType} />
      </div>
    </div>
  );
}

export function useContact() {
  return useOutletContext<ContextType>();
}
