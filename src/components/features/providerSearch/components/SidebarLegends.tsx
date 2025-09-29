"use client";

import Link from "next/link";
import React from "react";

import "../../../component-styles/SidebarLegends.css"

const SidebarLegends: React.FC = () => {
  return (
    <div className="sidebar-container">
      <fieldset className="legend-box">
        <legend style={{ maxWidth: "calc(40% - 22px)" }}>Navigate</legend>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/welcome">Manage Welcome Packets</Link>
          </li>
          <li>
            <Link href="/search">Search Providers</Link>
          </li>
          <li>
            <Link href="/client_exclusions">Search client exclusions</Link>
          </li>
          <li>
            <Link href="/client_inclusions">Search client inclusions</Link>
          </li>
        </ul>
      </fieldset>

      <fieldset className="legend-box">
        <legend style={{ maxWidth: "calc(20% - 14px)" }}>Add</legend>
        <ul>
          <li>
            <Link href="/add-group">Add a new group</Link>
          </li>
          <li>
            <Link href="/create">Add a new practitioner</Link>
          </li>
          <li>
            <Link href="/add-corp-entity">Add a new corporate entity</Link>
          </li>
          <li>
            <Link href="/add-facility">Add a new facility</Link>
          </li>
        </ul>
      </fieldset>
    </div>
  );
};

export default SidebarLegends;
