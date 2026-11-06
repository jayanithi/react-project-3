export const dummyProjects = [
  {
    id: "p1", name: "Website Redesign",
    description: "Refresh the company website experience.",
    color: "#8b7cff", status: "In Progress",
    dueDate: "2026-11-24", progress: 72, members: ["AJ", "MK", "SR"]
  },
  {
    id: "p2", name: "Mobile App Launch",
    description: "Prepare the mobile app for release.",
    color: "#35c9a5", status: "In Progress",
    dueDate: "2026-12-05", progress: 48, members: ["MK", "JD"]
  },
  {
    id: "p3", name: "Marketing Campaign",
    description: "Plan and launch the winter campaign.",
    color: "#f5b84b", status: "Planning",
    dueDate: "2026-12-12", progress: 25, members: ["SR", "AJ"]
  },
  {
    id: "p4", name: "Customer Portal",
    description: "Build a self-service customer portal.",
    color: "#ff7185", status: "Completed",
    dueDate: "2026-10-30", progress: 100, members: ["JD", "AJ"]
  }
];

export const dummyTasks = [
  { id: "t1", title: "Create homepage wireframes", projectId: "p1", status: "In Progress", priority: "High", dueDate: "2026-11-10", assignee: "AJ" },
  { id: "t2", title: "Review brand guidelines", projectId: "p1", status: "To Do", priority: "Medium", dueDate: "2026-11-12", assignee: "MK" },
  { id: "t3", title: "Build navigation component", projectId: "p1", status: "Done", priority: "High", dueDate: "2026-11-08", assignee: "SR" },
  { id: "t4", title: "Prepare app store screenshots", projectId: "p2", status: "To Do", priority: "Low", dueDate: "2026-11-18", assignee: "JD" },
  { id: "t5", title: "Implement user onboarding", projectId: "p2", status: "In Progress", priority: "High", dueDate: "2026-11-15", assignee: "MK" },
  { id: "t6", title: "Draft campaign content", projectId: "p3", status: "To Do", priority: "Medium", dueDate: "2026-11-20", assignee: "SR" },
  { id: "t7", title: "QA customer dashboard", projectId: "p4", status: "Done", priority: "Low", dueDate: "2026-10-28", assignee: "AJ" }
];

export const dummyTeam = [
  { id: "AJ", name: "Alex Johnson", role: "Product Designer", email: "alex@example.com", color: "#8b7cff" },
  { id: "MK", name: "Maya Kumar", role: "Frontend Developer", email: "maya@example.com", color: "#35c9a5" },
  { id: "SR", name: "Sam Rivera", role: "Project Manager", email: "sam@example.com", color: "#f5b84b" },
  { id: "JD", name: "Jordan Davis", role: "QA Engineer", email: "jordan@example.com", color: "#ff7185" }
];
