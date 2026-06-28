import React from "react";
import { Card } from "./Card";
import { cn } from "../../lib/utils";

export function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  iconBgColor = "bg-blue-100", 
  iconColor = "text-blue-600",
  trend,
  trendLabel,
  trendUp = true,
  className
}) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h4 className="text-2xl font-bold text-slate-800">{value}</h4>
        </div>
        {Icon && (
          <div className={cn("p-3 rounded-lg flex items-center justify-center", iconBgColor)}>
            <Icon className={cn("w-6 h-6", iconColor)} />
          </div>
        )}
      </div>
      
      {(trend || trendLabel) && (
        <div className="mt-4 flex items-center text-sm">
          {trend && (
            <span className={cn(
              "font-medium mr-2",
              trendUp ? "text-green-600" : "text-red-600"
            )}>
              {trendUp ? "+" : ""}{trend}
            </span>
          )}
          {trendLabel && (
            <span className="text-slate-500">{trendLabel}</span>
          )}
        </div>
      )}
    </Card>
  );
}
