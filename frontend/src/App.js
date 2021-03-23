import React, { useState, useEffect } from "react";
import api from "./services/api";

import Header from "./components/Header";

export default function App({ title }) {
  const [projects, setProject] = useState([]);

  useEffect(() => {
    api.get("project").then((resposta) => {
      setProject(resposta.data);
    });
  }, []);

  async function handleAddProject() {
    const resposta = await api.post("project", {
      title: `Novo projeto, ${Date.now()}`,
      owner: "felipe Suknaic",
    });

    const project = resposta.data;

    setProject([...projects, project]);
  }

  return (
    <>
      <Header title="inicio" />

      <ul>
        {projects.map((project) => (
          <li key={project.title}> {project.title} </li>
        ))}
      </ul>

      <button type="button" onClick={handleAddProject}>
        add novo
      </button>
    </>
  );
}
