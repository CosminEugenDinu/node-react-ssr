import React, { ReactComponentElement, ReactElement } from "react";

type HeaderData = {
  contact: {
    email: string;
    tel: string;
  }
};
export function Header(props: HeaderData) {
  return (
    <>
    <h4>Email: {props.contact.email}</h4>
    <h5>Telephone: {props.contact.tel}</h5>
    </>
  );
}