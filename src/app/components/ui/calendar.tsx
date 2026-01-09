"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "./utils";
import { buttonVariants } from "./button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "flex flex-col gap-5",
        caption: "flex justify-center pt-1 relative items-center w-full mb-2",
        caption_label: "text-[15px] font-semibold",
        nav: "flex items-center gap-1",
        nav_button: cn(
          "size-8 bg-transparent p-0 hover:bg-[var(--fill-accent)] rounded-full transition-colors",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse",
        head_row: "flex mb-1",
        head_cell:
          "rounded-md w-10 font-semibold text-[13px] uppercase",
        row: "flex w-full mt-1",
        cell: cn(
          "relative p-0 text-center text-[15px] focus-within:relative focus-within:z-20",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md",
        ),
        day: cn(
          "size-10 p-0 font-normal hover:bg-[var(--fill-accent)] rounded-md transition-colors aria-selected:opacity-100",
        ),
        day_range_start:
          "day-range-start aria-selected:bg-[var(--interactive-primary)] aria-selected:text-white",
        day_range_end:
          "day-range-end aria-selected:bg-[var(--interactive-primary)] aria-selected:text-white",
        day_selected:
          "bg-[var(--interactive-primary)] text-white hover:bg-[var(--interactive-primary)] hover:text-white focus:bg-[var(--interactive-primary)] focus:text-white font-semibold",
        day_today: "bg-[var(--fill-accent)] font-semibold",
        day_outside:
          "day-outside text-[var(--label-tertiary)] aria-selected:text-[var(--label-tertiary)] opacity-50",
        day_disabled: "text-[var(--label-tertiary)] opacity-30 cursor-not-allowed",
        day_range_middle:
          "aria-selected:bg-[var(--fill-accent)] aria-selected:text-[var(--label-primary)]",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };
