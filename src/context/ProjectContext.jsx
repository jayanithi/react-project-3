import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dummyProjects, dummyTasks } from "../data/dummyData";

const ProjectContext = createContext(null);

function readLocal(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(() => readLocal("orbit_projects", dummyProjects));
  const [tasks, setTasks] = useState(() => readLocal("orbit_tasks", dummyTasks));

  useEffect(() => {
    localStorage.setItem("orbit_projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("orbit_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addProject = (project) => {
    setProjects((current) => [{ ...project, id: `p-${Date.now()}`, progress: 0, members: [] }, ...current]);
  };

  const updateProject = (id, changes) => {
    setProjects((current) => current.map((project) =>
      project.id === id ? { ...project, ...changes } : project
    ));
  };

  const deleteProject = (id) => {
    setProjects((current) => current.filter((project) => project.id !== id));
    setTasks((current) => current.filter((task) => task.projectId !== id));
  };

  const addTask = (task) => {
    setTasks((current) => [{ ...task, id: `t-${Date.now()}` }, ...current]);
  };

  const updateTask = (id, changes) => {
    setTasks((current) => current.map((task) =>
      task.id === id ? { ...task, ...changes } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const value = useMemo(() => ({
    projects, tasks, addProject, updateProject, deleteProject,
    addTask, updateTask, deleteTask
  }), [projects, tasks]);

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("useProjects must be used inside ProjectProvider");
  return context;
}
