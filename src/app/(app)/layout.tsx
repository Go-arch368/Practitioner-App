// app/layout.tsx
import React from "react";
import "@/styles/CustomStyles.css";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="main-layout">
      {children}
    </div>
  );
}
