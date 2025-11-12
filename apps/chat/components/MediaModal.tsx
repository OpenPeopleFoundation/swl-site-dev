"use client";

import * as Dialog from "@radix-ui/react-dialog";

type MediaModalProps = {
  url?: string | null;
  isOpen: boolean;
  onClose: () => void;
};

export function MediaModal({ url, isOpen, onClose }: MediaModalProps) {
  if (!url) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur transition" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt="media"
            className="max-h-[90vh] max-w-[90vw] rounded-3xl border border-white/10 object-contain shadow-[0_30px_120px_rgba(0,0,0,0.7)]"
          />
          <button
            onClick={onClose}
            className="absolute right-8 top-8 rounded-full bg-white/10 px-3 py-1 text-sm text-white hover:bg-white/20"
          >
            Close
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default MediaModal;
