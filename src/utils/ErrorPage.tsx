


"use client";

import AppError from "@/components/model/AppError";

import React from "react";

interface Props{
    appError:AppError|null,
}


export default function ErrorPage({ appError }: Props) {
  if (!appError) return null; // Or render a default message, spinner, etc.

  const renderContent = () => {
    switch (appError.errorStatus) {
      case 400:
        return <p>Sorry!! Bad Data. Please validate your fields.</p>;
      case 5000:
        return (
          <p>
            Sorry!! Something wrong with our Systems. Please go to Homepage or
            Contact Customer Support.
          </p>
        );
      default:
        return (
          <p>
            Sorry!! Something wrong with our Systems. Please go to Homepage or
            Contact Customer Support.
          </p>
        );
    }
  };

  return <div>{renderContent()}</div>;
}



