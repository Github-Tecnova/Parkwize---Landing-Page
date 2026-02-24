/*
 * Copyright (c) 2025. Tecnova
 */

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function OrgNavButton({
  selected,
  travelAction,
  text,
}: {
  selected: boolean;
  travelAction: (page: string) => void;
  text: string;
}) {
  return (
    <Button
      onClick={() => travelAction(text.toLowerCase().replaceAll(" ", "-"))}
      variant={"ghost"}
      className={cn(
        "flex-grow rounded-none border-b-2 px-5 hover:border-primary_action",
        selected && "border-primary_action bg-accent",
      )}
    >
      {text}
    </Button>
  );
}
