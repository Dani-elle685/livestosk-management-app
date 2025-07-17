import { cn } from "@/lib/utils";

interface TextProps {
  title: string;
  description?: string;
  className?: string;
}

export const VerticalTextComponent: React.FC<TextProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <div className={cn("flex flex-col p-2", className)}>
      <p className="text-base font-medium">{title}</p>
      <p className="text-base text-muted-foreground capitalize">{description}</p>
    </div>
  );
};