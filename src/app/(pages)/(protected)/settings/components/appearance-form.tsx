"use client";

import React, { useEffect } from "react";
import { z } from "zod";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {ButtonWithSpinner} from "@/components/button-with-spinner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ETheme } from "@/lib/enums";
import { cn } from "@/lib/utils";
import auth from "@/lib/appwrite/auth";

interface SkeletonProps {
  containerClasses?: string;
  containerStyles?: React.CSSProperties;
}

interface ThemeFormItemProps {
  children: React.ReactNode;
  value: ETheme;
  title: string;
}

interface ThemeItemDimensions {
  height: number;
  width: number;
  tilt: number;
}

const themeItemDimensions: ThemeItemDimensions = {
  height: 148,
  width: 202.66,
  tilt: 30,
};

const formSchema = z.object({
  theme: z.nativeEnum(ETheme, {
    required_error: "Please select a theme.",
  }),
});

function LightSkeleton({ containerClasses, containerStyles }: SkeletonProps) {
  return (
    <div
      style={containerStyles}
      className={cn("space-y-2 rounded-sm bg-slate-50 p-2", containerClasses)}
    >
      <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
        <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
        <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
      </div>
      <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
        <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
        <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
      </div>
      <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
        <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
        <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
      </div>
    </div>
  );
}

function DarkSkeleton({ containerClasses, containerStyles }: SkeletonProps) {
  return (
    <div
      style={containerStyles}
      className={cn("space-y-2 rounded-sm bg-slate-950 p-2", containerClasses)}
    >
      <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
        <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
        <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
      </div>
      <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
        <div className="h-4 w-4 rounded-full bg-slate-400" />
        <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
      </div>
      <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
        <div className="h-4 w-4 rounded-full bg-slate-400" />
        <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
      </div>
    </div>
  );
}

function ThemeFormItem({ children, value, title }: ThemeFormItemProps) {
  return (
    <FormItem>
      <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
        <FormControl>
          <RadioGroupItem value={value} className="sr-only" />
        </FormControl>
        <div
          style={{
            height: `${themeItemDimensions.height}px`,
            width: `${themeItemDimensions.width}px`,
          }}
          className="items-center rounded-md border-2 border-muted p-1 hover:border-accent bg-popover hover:bg-accent hover:text-accent-foreground"
        >
          {children}
        </div>
        <span className="block w-full p-2 text-center font-normal">{title}</span>
      </FormLabel>
    </FormItem>
  );
}

export function AppearanceForm() {
  const { theme, setTheme } = useTheme();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme: (theme as ETheme) || "system",
    },
  });
  const { isValid, isSubmitting } = form.formState;
  const formValuesChanged = form.watch("theme") !== theme;

  const getTailwindTransformRotateValue = (tilt: number): string => {
    return `translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(${tilt}deg) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`;
  };
  const onSubmit = form.handleSubmit(async ({ theme }) => {
    setTheme(theme);
    toast({
      title: "Appearance Updated",
      description: "Your appearance settings have been updated.",
    });
  });

  useEffect(() => {
    (async function () {
      try {
        const themePref = await auth.getPreference<ETheme>("theme");
        if (themePref) form.setValue("theme", themePref);
        else if (theme) form.setValue("theme", theme as ETheme);
      } catch (error: any) {}
    })();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Theme</FormLabel>
              <FormDescription>Select the theme for the dashboard.</FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-3 gap-8 pt-2"
              >
                <ThemeFormItem value={ETheme.Light} title="Light">
                  <LightSkeleton />
                </ThemeFormItem>

                <ThemeFormItem value={ETheme.Dark} title="Dark">
                  <DarkSkeleton />
                </ThemeFormItem>

                <ThemeFormItem value={ETheme.System} title="System">
                  <div className="relative overflow-clip size-full rounded-[inherit]">
                    <div className="absolute -inset-full flex rotate-[30deg] ">
                      <div className="relative w-1/2 - overflow-clip ">
                        <LightSkeleton
                          containerStyles={{
                            width: `${themeItemDimensions.width}px`,
                            transform: getTailwindTransformRotateValue(-themeItemDimensions.tilt),
                          }}
                          containerClasses="translate-x-1/2 right-0 absolute top-1/2 -translate-y-1/2"
                        />
                      </div>
                      <div className="relative w-1/2 overflow-clip">
                        <DarkSkeleton
                          containerStyles={{
                            width: `${themeItemDimensions.width}px`,
                            transform: getTailwindTransformRotateValue(-themeItemDimensions.tilt),
                          }}
                          containerClasses="-translate-x-1/2 left-0 absolute top-1/2 -translate-y-1/2"
                        />
                      </div>
                    </div>
                  </div>
                </ThemeFormItem>
              </RadioGroup>
            </FormItem>
          )}
        />

        <ButtonWithSpinner
          type="submit"
          isLoading={isSubmitting}
          disabled={!isValid || !formValuesChanged}
          btnText="Update Appearance"
        />
      </form>
    </Form>
  );
}
