"use client";

import { useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import type { VoteOption } from "./types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface VotingConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedOption: VoteOption | null;
  onConfirm: () => Promise<boolean> | boolean;
}

export function VotingConfirmDialog({
  open,
  onOpenChange,
  selectedOption,
  onConfirm,
}: VotingConfirmDialogProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      const success = await onConfirm();
      if (success) {
        onOpenChange(false);
      }
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2 text-rose-600">
            <AlertTriangle className="h-5 w-5" />
            <AlertDialogTitle>Konfirmasi Pilihan</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            Anda telah memilih <strong>{selectedOption}</strong>. Apakah Anda
            yakin dengan pilihan ini?
            <br />
            <span className="text-rose-600 font-medium">
              Perhatian: Data voting tidak dapat diubah setelah dikonfirmasi.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isConfirming}
            className="md:w-[50%] w-full bg-slate-900 text-white hover:text-white hover:bg-slate-800 h-12 cursor-pointer"
          >
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-rose-600 hover:bg-rose-700 md:w-[50%] w-full h-12 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleConfirm();
            }}
            disabled={isConfirming}
          >
            {isConfirming ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              "Ya, Konfirmasi"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
