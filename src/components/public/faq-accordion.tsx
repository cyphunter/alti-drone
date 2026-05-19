"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type { FaqEntry } from "@/data/faq";
import { cn } from "@/lib/utils";

type FaqAccordionProps = {
  entries: readonly FaqEntry[];
  tone?: "dark" | "light";
  className?: string;
};

export function FaqAccordion({ entries, tone = "dark", className }: FaqAccordionProps) {
  const trigger = tone === "light" ? "text-paper" : "text-ocean-900";
  const answer = tone === "light" ? "text-sky-100/85" : "text-slate-500";
  const border = tone === "light" ? "border-paper/15" : "border-ocean-900/10";

  return (
    <Accordion.Root
      type="single"
      collapsible
      className={cn("divide-y", border, className)}
    >
      {entries.map((entry, i) => (
        <Accordion.Item key={i} value={`item-${i}`} className="group/item">
          <Accordion.Header>
            <Accordion.Trigger
              className={cn(
                "group flex w-full items-center justify-between gap-4 rounded-md px-3 py-5 text-left font-display text-lg transition-all duration-300 hover:text-accent-700 sm:text-xl",
                tone === "light"
                  ? "hover:bg-paper/5"
                  : "hover:bg-accent-500/5",
                "data-[state=open]:text-accent-700",
                trigger,
              )}
            >
              <span className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-block h-1.5 w-1.5 rounded-full bg-accent-500/30 transition-all duration-500 group-data-[state=open]:bg-accent-500 group-data-[state=open]:scale-150"
                />
                {entry.question}
              </span>
              <ChevronDown
                size={20}
                aria-hidden
                className="shrink-0 text-accent-500 transition-transform duration-500 ease-out group-hover:translate-y-0.5 group-data-[state=open]:rotate-180 group-data-[state=open]:translate-y-0"
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content
            className={cn(
              "overflow-hidden text-base leading-relaxed data-[state=closed]:animate-[accordion-up_220ms_ease-out] data-[state=open]:animate-[accordion-down_220ms_ease-out]",
              answer,
            )}
          >
            <div className="px-3 pb-5 pr-10">{entry.answer}</div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
