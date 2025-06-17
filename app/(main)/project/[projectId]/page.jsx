"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
// import { notFound } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";
import { getProject } from "@/actions/projects";

import SprintCreationForm from "../_components/create-sprint";
import SprintBoard from "../_components/sprint-board";
import { toast } from "sonner";

export default function ProjectPage() {
  const { projectId } = useParams();
  const router = useRouter();
  const { membership, isLoaded: isOrgLoaded } = useOrganization();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProject = async () => {
    try {
      if (!membership || !isOrgLoaded) return;

      const projectData = await getProject(projectId, membership.organization.id);
      if (!projectData) {
        toast.error("Project not found");
        router.push("/"); // or use notFound() in a fallback
        return;
      }

      setProject(projectData);
    } catch (error) {
      console.error("Failed to fetch project:", error);
      toast.error("Error fetching project");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [membership]);

  if (!isOrgLoaded || loading) return <div className="text-center mt-10">Loading...</div>;

  if (!project) return null; // or show custom not found message

  return (
    <div className="container mx-auto">
      <SprintCreationForm
        projectTitle={project.name}
        projectId={projectId}
        projectKey={project.key}
        sprintKey={project.sprints?.length + 1}
        orgId={project.organizationId}
      />

      {project.sprints.length > 0 ? (
        <SprintBoard
          sprints={project.sprints}
          projectId={projectId}
          orgId={project.organizationId}
        />
      ) : (
        <div className="text-center mt-10 text-white">Create a Sprint from the button above</div>
      )}
    </div>
  );
}
