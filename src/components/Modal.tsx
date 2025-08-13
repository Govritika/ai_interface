import React, { useEffect } from "react";

export default function Modal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <div className="bg-white dark:bg-gray-800 p-4 rounded max-w-lg w-full">
        {children}
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-3 py-2 rounded bg-red-500 text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
