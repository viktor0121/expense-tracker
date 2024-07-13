import React, { useEffect, useRef, useState } from "react";
import { Control } from "react-hook-form";
import { PopoverClose } from "@radix-ui/react-popover";
import { Check, ChevronsUpDown, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface FormSelectRelatedProps<T extends { [key: string]: any }, K extends keyof T & string> {
  name: string;
  label: string;
  placeholder: string;
  control: Control<any, any>;
  relatedData: T[];
  valueKey: K;
  displayKey: K;
  commandEmptyText: string;
  commandInputPlaceholder?: string;
  mainButton?: {
    icon: LucideIcon;
    onClick: () => void;
    tooltip: string;
    className?: string;
    iconClassName?: string;
  };
  actionButton?: {
    icon: LucideIcon;
    onClick: (data: T) => void;
    className?: string;
    iconClassName?: string;
  };
}

export function FormSelectRelatedField<T extends { [key: string]: any }, K extends keyof T & string>({
  name,
  label,
  placeholder,
  control,
  relatedData,
  valueKey,
  displayKey,
  mainButton,
  actionButton,
  commandInputPlaceholder,
  commandEmptyText,
}: FormSelectRelatedProps<T, K>) {
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const [comboBoxWidth, setComboBoxWidth] = useState<Number>(-1);

  useEffect(() => {
    // Set ComboBox Width as the same as the trigger button width
    const updateComboBoxWidth = () => {
      if (triggerButtonRef.current) setComboBoxWidth(triggerButtonRef.current.offsetWidth);
    };
    updateComboBoxWidth();
    window.addEventListener("resize", updateComboBoxWidth);

    // Cleanup function to remove event listener on unmount
    return () => window.removeEventListener("resize", updateComboBoxWidth);
  }, []);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  ref={triggerButtonRef}
                  variant="outline"
                  role="combobox"
                  className={cn("justify-between capitalize", !field.value && "text-muted-foreground")}
                >
                  {field.value ? relatedData.find((item) => item[valueKey] === field.value)?.[displayKey] : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent
              // This will prevent AddNewCategory buttons tooltip auto open
              onOpenAutoFocus={(e) => e.preventDefault()}
              className="p-0"
              style={{ width: `${comboBoxWidth}px` }}
            >
              <Command>
                <div className="relative">
                  {/*MainButton*/}
                  {mainButton ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={mainButton.onClick}
                          size="icon"
                          variant="ghost"
                          className={cn(
                            "absolute right-1 top-1/2 size-9 -translate-y-1/2 rounded-sm text-muted-foreground hover:text-white",
                            mainButton?.className,
                          )}
                        >
                          <mainButton.icon className={cn("size-[18px]", mainButton.iconClassName)} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{mainButton.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : null}

                  {/*Input*/}
                  <CommandInput placeholder={commandInputPlaceholder} className={cn(mainButton && "pr-8")} />
                </div>

                <CommandEmpty>{commandEmptyText}</CommandEmpty>

                <CommandList>
                  <CommandGroup>
                    {relatedData.map((item, index) => (
                      <div key={index} className="group flex rounded-md hover:bg-accent">
                        <PopoverClose className="flex-1">
                          <CommandItem
                            value={item[displayKey]}
                            key={item[valueKey]}
                            className="flex-1"
                            onSelect={() => field.onChange(item[valueKey])}
                          >
                            <Check
                              className={cn(
                                "mr-2 size-4",
                                item[valueKey] === field.value ? "opacity-100" : "opacity-0",
                              )}
                            />
                            {item[displayKey]}
                          </CommandItem>
                        </PopoverClose>

                        {actionButton ? (
                          <Button
                            onClick={() => actionButton.onClick(item)}
                            className={cn(
                              "hidden h-auto bg-transparent p-0 pr-2 group-hover:block hover:bg-transparent",
                              actionButton.className,
                            )}
                          >
                            <actionButton.icon
                              className={cn(
                                "size-4 text-muted-foreground transition",
                                actionButton.iconClassName,
                              )}
                            />
                          </Button>
                        ) : null}
                      </div>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
