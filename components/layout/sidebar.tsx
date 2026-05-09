"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Table2, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Table",
    href: "/table",
    icon: Table2,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={cn(
      "h-screen border-r bg-background flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b">
        <h1 className={cn(
          "font-bold transition-all duration-300",
          isCollapsed ? "text-sm" : "text-xl"
        )}>
          {isCollapsed ? "D" : "Dashboard"}
        </h1>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="cursor-pointer"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Menu */}
      <Collapsible open={!isCollapsed} onOpenChange={() => {}}>
        <CollapsibleContent className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition cursor-pointer",
                  active ? "bg-muted font-medium" : "hover:bg-muted/50",
                )}
              >
                <Icon className="h-4 w-4" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </CollapsibleContent>
      </Collapsible>

      {/* Footer */}
      <div className="p-2 border-t text-xs text-muted-foreground text-center">
        {isCollapsed ? "v1" : "v1.0.0"}
      </div>
    </aside>
  );
}
