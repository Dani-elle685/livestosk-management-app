"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Share2, Copy } from "lucide-react";
import Link from "next/link";

export function ShareButton() {
  const [open, setOpen] = useState(false);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
        <Share2 className="w-4 h-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share this listing</DialogTitle>
            <DialogDescription>
              Copy the link or share it via one of these platforms.
            </DialogDescription>
          </DialogHeader>

          {/* Copy Link */}
          <div className="flex items-center gap-2">
            <Input readOnly value={currentUrl} />
            <Button variant="secondary" size="icon" onClick={handleCopy}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>

          {/* Share Options */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <Link
              href={`https://wa.me/?text=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              className="bg-green-500 text-white px-3 py-2 rounded text-center hover:opacity-90"
            >
              WhatsApp
            </Link>
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              className="bg-blue-600 text-white px-3 py-2 rounded text-center hover:opacity-90"
            >
              Facebook
            </Link>
            <Link
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              className="bg-sky-500 text-white px-3 py-2 rounded text-center hover:opacity-90"
            >
              Twitter
            </Link>
            <Link
              href={`mailto:?subject=Check this out&body=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              className="bg-gray-600 text-white px-3 py-2 rounded text-center hover:opacity-90"
            >
              Email
            </Link>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
