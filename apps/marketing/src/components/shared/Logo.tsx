import { cn } from "@pt/ui/cn";

export function Logo({
  withLabel = true,
  className,
}: {
  className?: string;
  withLabel?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex items-center font-semibold text-foreground leading-none",
        className
      )}
    >
      <svg className='size-10 text-primary' viewBox='0 0 734 635'>
        <title>Logo</title>
        {/* {path} */}
      </svg>
      {withLabel && <span className='ml-3 hidden text-lg md:block'>Logo</span>}
    </span>
  );
}
