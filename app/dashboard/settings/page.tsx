'use client'
import { useState } from "react";
import Image from "next/image";
import VideoPlayer from "@/app/components/VideoPlayer/VideoPlayer";
import MultiSelect from "@/app/components/MultiSelect/MultiSelect";

const Modal = ({ isOpen, onClose, children }:{isOpen:boolean, onClose:() => void, children:React.ReactNode}) => {
  if (!isOpen) return null; // Não renderiza a modal se ela estiver fechada

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-1/3">
        {/* Botão de fechar */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Conteúdo da modal */}
        <div>{children}</div>
      </div>
    </div>
  );
};


function Settings(){

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-slate-500 h-screen w-full gap-32 flex flex-col items-center justify-center">

      <MultiSelect />
      <div className="text-center m-4">
      <VideoPlayer
        src="https://videos.pexels.com/video-files/4524598/4524598-sd_640_360_25fps.mp4"
        // poster="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b2NlYW58ZW58MHx8MHx8fDA%3D"
      />
      </div>

      
      <button
        onClick={openModal}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Abrir Configurações
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-semibold">Configurações</h2>
        <p className="mt-2">Estas são as configurações BLABLABLA</p>
        <Image width={100} height={100} alt="imagem" src={'/38e1e87b-43ae-4131-baf4-f8b9c786c072.jpeg'}/>
      </Modal>
    </div>
  );
}

export default Settings;