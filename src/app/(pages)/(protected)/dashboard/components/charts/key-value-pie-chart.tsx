import { Cell, Pie, PieChart, PieLabel, ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "@/lib/utils";
import useCurrencyContext from "@/context/currency/useCurrencyContext";

interface KeyValuePieChart {
  data: {
    name: string;
    value: number;
  }[];
  containerClasses?: string;
}

export default function CategoryPie({ containerClasses, data}: KeyValuePieChart) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const RADIAN = Math.PI / 180;

  const { currency } = useCurrencyContext();

  return (
    <ResponsiveContainer
      className={cn(containerClasses, "aspect-square")}
      minHeight={300}
      maxHeight={400}
    >
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius="30%"
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
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
          }}
          strokeWidth={2}
        >
          {data.map((_, index) => (
            <Cell
              key={index}
              stroke={"hsl(var(--secondary))"}
              fill={COLORS[index % COLORS.length]}
              className="hover:opacity-80 outline-none hover:outline-none focus:outline-none active:outline-none"
            />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) =>
            active && payload && payload.length ? (
              <p className="capitalize z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                {payload[0].name}: {currency.symbolNative}
                {payload[0].value}
              </p>
            ) : null
          }
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
