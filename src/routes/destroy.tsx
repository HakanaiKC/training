/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, useNavigate, useParams } from "react-router-dom";
import { deleteContact } from "../contact";

export async function destroyAction({ params }: { params: any }) {
  await deleteContact(params.contactId);
  return redirect("/contacts");
}
