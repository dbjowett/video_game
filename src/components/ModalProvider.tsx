import { createContext, useContext, useState, type ReactNode } from "react";

interface ModalContextProps {
  isModalOpen: boolean;
  modalContent: ReactNode | null;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

const ModalProviderContext = createContext<ModalContextProps | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const openModal = (content: ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

  return (
    <ModalProviderContext.Provider
      value={{
        isModalOpen,
        modalContent,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalProviderContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalProviderContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
