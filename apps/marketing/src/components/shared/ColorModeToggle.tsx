"use client";

import { Button } from "@pt/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@pt/ui/dropdown-menu";
import { HardDriveIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

export function ColorModeToggle() {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const [value, setValue] = useState<string>(theme ?? "system");

  const colorModeOptions = [
    {
      value: "system",
      label: "System",
      icon: HardDriveIcon,
    },
    {
      value: "light",
      label: "Light",
      icon: SunIcon,
    },
    {
      value: "dark",
      label: "Dark",
      icon: MoonIcon,
    },
  ];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          data-test='color-mode-toggle'
          aria-label='Color mode'
        >
          {resolvedTheme === "light" ? (
            <SunIcon className='size-4' />
          ) : (
            <MoonIcon className='size-4' />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(value) => {
            setTheme(value);
            setValue(value);
          }}
        >
          {colorModeOptions.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              data-test={`color-mode-toggle-item-${option.value}`}
            >
              <option.icon className='mr-2 size-4 opacity-50' /> {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
