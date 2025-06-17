import { Suspense } from "react";

export default async function ProjectLayout({ children }) {
  return (
    <div className="mx-auto">
      <Suspense fallback={<span className="text-white">Loading ...</span>}>
        {children}
      </Suspense>
    </div>
  );
}
