"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import FormDateField from "@/components/form-date-field";
import ButtonWithSpinner from "@/components/button-with-spinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { EExpenseType } from "@/lib/enums";
import { cn } from "@/lib/utils";
import database from "@/lib/appwrite/database";

const formSchema = z.object({
  date: z.date({ required_error: "Date is required" }),
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "First Name must be at most 100 characters"),
  amount: z
    .string()
    .trim()
    .min(1, "Amount must not be empty")
    .refine((str) => /^[0-9.-]+$/.test(str), "Amount must contain only numbers")
    .refine((str) => parseFloat(str) >= 0, "Amount must be a positive number")
    .refine((str) => parseFloat(str) >= 0.01, "Amount must be at least 0.01")
    .refine((str) => parseFloat(str) < 10_000_000, "Amount must be at most 10,00,00,000"),
  type: z.nativeEnum(EExpenseType, {
    required_error: "Please select an expense type.",
  }),
  category: z.string().min(1, "Category is required"),
});

export default function ExpenseForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      // @ts-ignore
      amount: "",
      // @ts-ignore
      type: "",
      category: "",
    },
  });

  const { toast } = useToast();
  const { isSubmitting, isValid } = form.formState;

  const buttonRef = useRef<HTMLButtonElement>(null);
  // TODO: Add type
  const [categories, setCategories] = useState([]);
  const [comboBoxWidth, setComboBoxWidth] = useState<Number>(-1);

  const submit = form.handleSubmit(async ({ date, amount, title, type, category }) => {
    console.log({ date, amount, title, type, category });

    try {
      // TODO: Handle expense form submission
      toast({
        title: "Success!",
        description: "Your savings have been added successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  useEffect(() => {
    // Set ComboBox Width
    const updateComboBoxWidth = () => {
      if (buttonRef.current) setComboBoxWidth(buttonRef.current.offsetWidth);
    };
    updateComboBoxWidth();
    window.addEventListener("resize", updateComboBoxWidth);

    // Fetch Categories
    (async () => {
      try {
        await database.getExpenseCategories({ queries: [] });
      } catch (error: any) {
        toast({
          title: "Unable to fetch categories.",
          description: error.message,
          variant: "destructive",
        });
      }
    })();

    // Cleanup function to remove event listener on unmount
    return () => window.removeEventListener("resize", updateComboBoxWidth);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={submit} className="grid gap-3">
        {/*Name Input*/}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormDateField name="date" label="Date" placeholder="Pick a date" control={form.control} />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Category</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      ref={buttonRef}
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between capitalize",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? categories.find((category) => category === field.value)
                        : "Select Category"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0" style={{ width: `${comboBoxWidth}px` }}>
                  <Command>
                    <CommandInput placeholder="Search Category" />
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            value={category}
                            key={category}
                            onSelect={() => form.setValue("category", category)}
                            className="capitalize"
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                category === field.value ? "opacity-100" : "opacity-0",
                              )}
                            />
                            {category}
                          </CommandItem>
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

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="capitalize">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(EExpenseType).map((type, index) => (
                    <SelectItem key={index} value={type} className="capitalize">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/*Submit Button*/}
        <ButtonWithSpinner
          isLoading={isSubmitting}
          disabled={!isValid}
          type="submit"
          className="mt-2 w-full"
          btnText="Add Record"
        />
      </form>
    </Form>
  );
}
