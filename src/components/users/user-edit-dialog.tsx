import { useState } from "react";
import { Loader2 } from "lucide-react";
import type { FormEvent } from "react";
import type { UserFormErrors, UserRecord } from "./types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogForm,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UserEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserRecord | null;
  onSave: (payload: { id: number }) => Promise<boolean> | boolean;
  errors?: UserFormErrors;
}

export function UserEditDialog({
  open,
  onOpenChange,
  user,
  onSave,
  errors,
}: UserEditDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsLoading(true);
    try {
      const success = await onSave({
        id: user.id,
      });
      if (success) onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = true;

  const generalError = errors?.general?.[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogForm onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Edit User</DialogTitle>
            <DialogDescription>Silakan ubah data user</DialogDescription>
          </DialogHeader>

          <DialogBody className="grid gap-4 py-4">
            {/* Anggota (readonly) */}
            <div className="grid gap-2">
              <Label className="text-slate-600 font-medium">Anggota</Label>
              <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="font-medium text-slate-900">
                  {user?.name ?? "-"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user?.email ?? ""}
                </p>
              </div>
            </div>

            {generalError ? (
              <p className="text-sm text-destructive">{generalError}</p>
            ) : null}
          </DialogBody>

          <DialogFooter>
            <Button
              type="button"
              variant="destructive"
              className="md:w-[50%] w-full h-12 cursor-pointer"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="md:w-[50%] w-full bg-slate-900 text-white hover:bg-slate-800 h-12 cursor-pointer"
              disabled={isLoading || !isFormValid}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan
            </Button>
          </DialogFooter>
        </DialogForm>
      </DialogContent>
    </Dialog>
  );
}
