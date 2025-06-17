"use client";

import { OrganizationList } from "@clerk/nextjs";
import { useCallback } from "react";
import { useOrganizationList } from "@clerk/nextjs";

export default function Onboarding() {
  const { setActive } = useOrganizationList();


  const handleSelectOrg = useCallback((org) => {
    if (!org?.id || !org?.slug) return;
  
    setActive({ organization: org.id })
      .then(() => {
        console.log("✅ setActive success");
  
        // 🕒 Give Clerk time to update cookies before redirect
        setTimeout(() => {
          window.location.href = `/organization/${org.slug}`;
        }, 500); // 1 second delay
      })
      .catch((err) => {
        console.error("❌ setActive failed", err);
      });
  }, [setActive]);
  

  return (
    <div className="flex justify-center items-center pt-14">
      <OrganizationList
        hidePersonal
        afterCreateOrganizationUrl={(org) => {
          handleSelectOrg(org);
          return `/organization/${org.slug}`;
        }}
        afterSelectOrganizationUrl={(org) => {
          handleSelectOrg(org);
          return `/organization/${org.slug}`;
        }}
      />
    </div>
  );
}
