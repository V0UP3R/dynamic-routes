"use client";
import { useState, useEffect } from "react";

export default function UserDocuments({
  params,
}: {
  params: { userId: string };
}) {
  const [data, setData] = useState({
    name: "",
    bio: "",
    public_repos: 0,
    location: "",
  });
  const [, setLoading] = useState(true);

  useEffect(() => {
    // Faz a requisição para a API do GitHub

    fetch("https://api.github.com/users/V0UP3R")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
        setLoading(false);
      });
  }, []);

  // if (loading) {
  //   return <div className="w-full h-screen bg-red-400 flex items-center justify-center">Carregando00000000000000000000000000000000000...</div>;
  // }

  return (
    <div className="bg-slate-500 w-full h-screen flex items-center justify-center">
      Documentos do Usuario com UUID: {params.userId}
      <div>
        <h1>Dados do GitHub</h1>
        <p>
          <strong>Nome:</strong> {data.name}
        </p>
        <p>
          <strong>Bio:</strong> {data.bio}
        </p>
        <p>
          <strong>Repositórios Públicos:</strong> {data.public_repos}
        </p>
        <p>
          <strong>Localização:</strong> {data.location}
        </p>
      </div>
    </div>
  );
}
