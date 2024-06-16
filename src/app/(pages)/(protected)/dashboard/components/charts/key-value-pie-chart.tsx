import React from "react";
import { CircleIcon, DotIcon } from "lucide-react";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { Props as LegendProps } from "recharts/types/component/DefaultLegendContent";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  PieLabel,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import useCurrencyContext from "@/context/currency/useCurrencyContext";
import { CHART_COLORS, RADIAN } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface KeyValuePieChart {
  data: {
    name: string;
    value: number;
  }[];
  containerClasses?: string;
  isLoading?: boolean;
}

export default function CategoryPie({ containerClasses, isLoading, data }: KeyValuePieChart) {
  const { currency } = useCurrencyContext();

  return (
    <ResponsiveContainer
      className={cn(containerClasses, "aspect-square")}
      minHeight={300}
      maxHeight={400}
    >
      {isLoading ? (
        <div className="h-full aspect-square mx-auto grid place-items-center">
          <Skeleton className="rounded-full size-[80%] aspect-square mx-auto" />
        </div>
      ) : (
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="30%"
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomPieLabel}
            strokeWidth={2}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                stroke={"hsl(var(--secondary))"}
                fill={CHART_COLORS[index % CHART_COLORS.length]}
                className="hover:opacity-80 outline-none hover:outline-none focus:outline-none active:outline-none"
              />
            ))}
          </Pie>

          <Tooltip
            content={(props) =>
              renderCustomTooltipContent({
                ...props,
                currencySymbol: currency.symbolNative,
              })
            }
          />

          <Legend />
        </PieChart>
      )}
    </ResponsiveContainer>
  );
}

type CustomTooltipProps = TooltipProps<ValueType, NameType> & {
  currencySymbol: string;
};

function renderCustomPieLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="hsl(var(--primary-foreground))"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

function renderCustomTooltipContent({ active, payload, currencySymbol }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <p className="capitalize z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
      <span style={{ color: payload[0].payload.fill }}>{payload[0].name}:</span>{" "}
      <span>{`${currencySymbol}${payload[0].value}`}</span>
    </p>
  );
}

