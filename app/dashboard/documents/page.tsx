import UserList from "@/app/components/UserList/UserList";

export default function Documents(){

  return (
    <div className="bg-slate-500 w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Tela de Documentos</h1>
      <UserList />
    </div>
  );
}
