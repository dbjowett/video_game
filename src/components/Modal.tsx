import { X } from "@phosphor-icons/react";
import { useEffect, type MouseEvent } from "react";
import { useModal } from "./ModalProvider";
import { isScrollbarVisible } from "~/utils";



export const Modal = () => {
  const { closeModal, isModalOpen, modalContent } = useModal();

  useEffect(() => {
    const body = document.body;
    if (isModalOpen && isScrollbarVisible(body)) {
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

  useEffect(() => {
    const handleKeypress = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };
    if (typeof window === "undefined") return;
    window.addEventListener("keyup", handleKeypress);
    return () => window.removeEventListener("keyup", handleKeypress);
  }, [isModalOpen, closeModal]);

  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    const targetID = (e.target as HTMLDivElement)?.id;
    if (targetID !== "bg") return;
    closeModal();
  };

  return (
    isModalOpen && (
      <div
        onClick={handleBackgroundClick}
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
