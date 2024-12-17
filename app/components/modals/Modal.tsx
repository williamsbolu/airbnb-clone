"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";
import { useOutsideClick } from "@/app/hooks/useOutsideClick";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  // Secondary action: would most likely be the previous and next button on the modal
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  const ref = useOutsideClick(handleClose);

  if (!isOpen) return null;

  return (
    <>
      <div className="flex justify-center items-center overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div
          className="relative w-full my-6 mx-auto h-full md:w-4/6 md:h-auto lg:h-auto lg:w-3/6 xl:w-2/5"
          ref={ref}
        >
          {/* CONTENT */}
          <div
            className={`translate duration-300 ${
              showModal ? "translate-y-0" : "translate-y-full"
            } ${
              isOpen ? "opacity-100" : "opacity-0"
            } translate h-full overflow-y-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none md:overflow-y-visible md:h-auto`}
          >
            {/* HEADER */}
            <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
              <button
                onClick={handleClose}
                className="p-1 border-0 hover:opacity-70 transition absolute left-9"
              >
                <IoMdClose size={18} />
              </button>
              <div className="text-lg font-semibold">{title}</div>
            </div>
            {/* BODY */}
            <div className="relative p-6 flex-auto">{body}</div>
            {/* FOOTER */}
            <div className="flex flex-col gap-2 p-6">
              <div className="flex flex-row items-center gap-4 w-full">
                {secondaryActionLabel && secondaryAction && (
                  <Button
                    outline
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                  />
                )}
                <Button
                  disabled={disabled}
                  label={actionLabel}
                  onClick={handleSubmit}
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
