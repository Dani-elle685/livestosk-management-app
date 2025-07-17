import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface LivestockDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?:string;
}

export function LivestockDialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  className
}: LivestockDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
    <DialogContent className={cn("max-h-[95vh] overflow-y-auto p-2 md:px-6 md:py-4 rounded", className)}>
        <DialogHeader>
          {title ?  <DialogTitle className="text-center">{title}</DialogTitle> :  <VisuallyHidden><DialogTitle>Confirm Vaccine</DialogTitle></VisuallyHidden>}
          {description ? <DialogDescription className="text-center">{description}</DialogDescription> :  <VisuallyHidden><DialogDescription>Confirm Vaccine</DialogDescription></VisuallyHidden>}
        </DialogHeader>

        {/* Scrollable content container */}
        <div className="mt-4 space-y-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
