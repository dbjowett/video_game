import { X } from "@phosphor-icons/react";
import { useEffect, type MouseEvent } from "react";
import { useModal } from "./ModalProvider";

export const Modal = () => {
  const { closeModal, isModalOpen, modalContent } = useModal();

  useEffect(() => {
    const body = document.body;
    if (isModalOpen) {
      // TODO: Test this on mobile
      body.style.overflow = "hidden";
      body.style.paddingRight = "17px";
    } else {
      body.style.overflow = "visible";
      body.style.paddingRight = "0px";
    }

    return () => {
      body.style.overflow = "visible";
      body.style.paddingRight = "0";
    };
  }, [isModalOpen]);

  const handleBgClick = (e: MouseEvent<HTMLDivElement>) => {
    const targetID = (e.target as HTMLDivElement)?.id;
    if (targetID !== "bg") return;
    closeModal();
  };

  return (
    isModalOpen && (
      <div
        onClick={handleBgClick}
        id="bg"
        className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-75"
      >
        {modalContent}
        <button
          onClick={closeModal}
          className="absolute right-6 top-6 z-50 text-white"
        >
          <X size={32} />
        </button>
      </div>
    )
  );
};
