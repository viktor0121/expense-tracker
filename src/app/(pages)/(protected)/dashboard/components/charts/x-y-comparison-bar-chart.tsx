import { cn } from "@/lib/utils";
import {
  Bar,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
} from "recharts";
import useCurrencyContext from "@/context/currency/useCurrencyContext";
import { CHART_COLORS } from "@/lib/constants";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface BarChartProps {
  data: {
    name: string;
    values: {
      x: { name: string; value: number };
      y: { name: string; value: number };
    };
  }[];
  isLoading?: boolean;
  containerClasses?: string;
}

export default function XYComparisonBarChart({ data, isLoading, containerClasses }: BarChartProps) {
  const { currency } = useCurrencyContext();

  return (
    <ResponsiveContainer
      className={cn(containerClasses, "overflow-auto")}
      minHeight={300}
      maxHeight={400}
      width={data.length * 100}
    >
      {isLoading ? (
        <div className="h-full ">
          <Skeleton className="h-[85%]" />
          <div className="mx-auto w-40 h-6 flex justify-between gap-[10%] mt-7">
            <Skeleton className="w-[45%]" />
            <Skeleton className="w-[45%]" />
          </div>
        </div>
      ) : (
        <BarChart data={data}>
          <CartesianGrid stroke="hsl(var(--primary))" strokeOpacity={0.2} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            cursor={{ fill: "hsl(var(--primary))", fillOpacity: 0.1 }}
            content={({ active, payload }) => {
              if (!active || !payload || !payload.length) return null;

              return (
                <div className="capitalize z-50 overflow-hidden rounded-md border bg-popover space-y-s2 p-3 font-semibold text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                  <p style={{ color: CHART_COLORS[0] }}>
                    {`${payload[0].name}: ${currency.symbolNative}${payload[0].value}`}
                  </p>
                  <p style={{ color: CHART_COLORS[1] }}>
                    {`${payload[1].name}: ${currency.symbolNative}${payload[1].value}`}
                  </p>
                </div>
              );
            }}
          />
          <Bar
            background={{ fill: "hsl(var(--primary))", opacity: 0.03 }}
            dataKey="values.x.value"
            legendType="circle"
            name={data[0]?.values?.x?.name}
            fill={CHART_COLORS[0]}
          />
          <Bar
            background={{ fill: "hsl(var(--primary))", opacity: 0.03 }}
            dataKey="values.y.value"
            legendType="circle"
            name={data[1]?.values?.y?.name}
            fill={CHART_COLORS[1]}
          />

          <Legend />
        </BarChart>
      )}
    </ResponsiveContainer>
  );
}
