import { Accessibility, Contrast } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { usePrefs, type TextSize } from "@/lib/preferences";

export function ReadingSettings() {
  const { lang, textSize, setTextSize, highContrast, setHighContrast } = usePrefs();
  const ar = lang === "ar";
  const sizes: { value: TextSize; label: string }[] = [
    { value: "normal", label: ar ? "عادي" : "Default" },
    { value: "large", label: ar ? "كبير" : "Large" },
    { value: "larger", label: ar ? "أكبر" : "Larger" },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="h-11 w-11 shrink-0 border-border bg-background text-foreground" aria-label={ar ? "إعدادات سهولة القراءة" : "Reading settings"} title={ar ? "إعدادات سهولة القراءة" : "Reading settings"}>
          <Accessibility aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={10} className="w-[min(20rem,calc(100vw-2rem))] space-y-5 border-border bg-popover text-popover-foreground shadow-cinematic" dir={ar ? "rtl" : "ltr"}>
        <h2 className="font-display text-base">{ar ? "سهولة القراءة" : "Reading settings"}</h2>
        <fieldset className="space-y-2">
          <legend className="mb-2 text-sm font-semibold">{ar ? "حجم النص" : "Text size"}</legend>
          <div className="grid grid-cols-3 gap-1 rounded-md bg-muted p-1">
            {sizes.map(({ value, label }) => (
              <Button key={value} type="button" variant={textSize === value ? "default" : "ghost"} aria-pressed={textSize === value} onClick={() => setTextSize(value)} className="min-h-11 min-w-0 px-1 text-xs whitespace-normal leading-tight">
                {label}
              </Button>
            ))}
          </div>
        </fieldset>
        <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
          <label htmlFor="reading-contrast" className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
            <Contrast className="h-4 w-4 shrink-0" aria-hidden="true" />
            {ar ? "تباين أعلى" : "Higher contrast"}
          </label>
          <Switch id="reading-contrast" checked={highContrast} onCheckedChange={setHighContrast} className="h-6 w-11 [&>span]:h-5 [&>span]:w-5 data-[state=checked]:[&>span]:translate-x-5" />
        </div>
      </PopoverContent>
    </Popover>
  );
}