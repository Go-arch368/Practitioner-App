"use client";

import "@/app/App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchMetadata } from "@/redux/metadataSlice";
import { fetchConfigData } from "@/redux/ConfigDataSlice";

import MainLayout from "@/app/(app)/layout";
import { RadioProvider } from "@/context/radioContext";
import ProviderSearchType from "./components/ProviderSearchType";
import ProviderSearchComponents from "./components/ProviderSearchComponents";
import SidebarLegends from "./components/SidebarLegends";

export default function ProviderSearchApp() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMetadata());
    dispatch(fetchConfigData());
  }, [dispatch]);

  return (
    <MainLayout>
      <div className="main-content-wrapper flex">
        <SidebarLegends />
        <div className="main-content-body flex-1">
          <RadioProvider>
            <ProviderSearchType />
            <ProviderSearchComponents />
          </RadioProvider>
        </div>
      </div>
    </MainLayout>
  );
}
