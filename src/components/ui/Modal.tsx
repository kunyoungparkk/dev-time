"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { Button } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  primaryButtonText = "Confirm",
  secondaryButtonText = "Cancel",
  onPrimaryClick,
  onSecondaryClick,
  className,
}: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      onClose();
    };

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;

    if (!isInDialog) {
      onClose();
    }
  };

  const handlePrimaryClick = () => {
    onPrimaryClick?.();
    onClose();
  };

  const handleSecondaryClick = () => {
    onSecondaryClick?.();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className={cn(
        "backdrop:bg-dim-70",
        "p-0 border-0 rounded-xl",
        "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        "m-0",
        className,
      )}
    >
      <div className="bg-white w-82 rounded-xl p-6 flex flex-col gap-6 shadow-[var(--color-shadow-1)]">
        <div className="flex flex-col gap-2">
          {title && <h2 className="fontSize-title-s">{title}</h2>}
          {description && <p className="fontSize-body-m">{description}</p>}
        </div>

        <div className="gap-2 flex justify-end">
          <Button variant="secondary" onClick={handleSecondaryClick}>
            {secondaryButtonText}
          </Button>
          <Button variant="primary" onClick={handlePrimaryClick}>
            {primaryButtonText}
          </Button>
        </div>
      </div>
    </dialog>
  );
};
