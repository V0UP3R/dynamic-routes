import Table from "../components/Table/Table";
import { fetcher } from "../actions/fetcher";

async function Dashboard() {

  const columns = ['name', 'url'];

  const pokemonData = await fetcher();

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Tabela de Usuários</h1>
      <Table data={pokemonData} columns={columns}/>
    </div>
  );
}

export default Dashboard;