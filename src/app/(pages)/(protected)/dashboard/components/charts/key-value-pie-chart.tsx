import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

interface KeyValuePieChart {
  data: Record<string, number>;
  containerClasses?: string;
}

export default function CategoryPie({ containerClasses, data: rawData }: KeyValuePieChart) {
  const data = Object.entries(rawData).map(([key, value]) => ({
    key,
    value,
  }));

  return (
    <ResponsiveContainer className={cn(containerClasses)} minHeight={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="key"
          innerRadius="30%"
          label={(item) => item.value}
          strokeWidth={2}
        >
          {data.map((_, index) => (
            <Cell
              key={index}
              stroke={"hsl(var(--secondary))"}
              className=" fill-primary hover:fill-primary/90 outline-none hover:outline-none focus:outline-none active:outline-none"
            />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) =>
            active && payload && payload.length ? (
              <p className="capitalize z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                {payload[0].name}
              </p>
            ) : null
          }
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
