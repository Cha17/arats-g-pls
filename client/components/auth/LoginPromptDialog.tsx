"use client";

import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { AuthButtons } from "./auth-buttons";

interface LoginPromptDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginPromptDialog({ isOpen, onClose }: LoginPromptDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Sign In Required
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            You need to sign in to register for events. Please sign in with your
            account to continue.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 pt-4">
          <AuthButtons />

          <Button variant="outline" onClick={onClose} className="w-full">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
