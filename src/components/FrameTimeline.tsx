import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

interface FrameTimelineProps {
  timeline: number[];
}

export default function FrameTimeline({ timeline }: FrameTimelineProps) {
  const data = timeline.map((value, i) => ({
    frame: i + 1,
    fakeProbability: Math.round(value * 100) / 100,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="h-48"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
          <XAxis
            dataKey="frame"
            label={{ value: "Frame", position: "insideBottom", offset: -5, style: { fill: "hsl(215 20% 55%)", fontSize: 11 } }}
            tick={{ fill: "hsl(215 20% 55%)", fontSize: 10 }}
            stroke="hsl(222 30% 18%)"
          />
          <YAxis
            domain={[0, 1]}
            label={{ value: "Fake Prob", angle: -90, position: "insideLeft", style: { fill: "hsl(215 20% 55%)", fontSize: 11 } }}
            tick={{ fill: "hsl(215 20% 55%)", fontSize: 10 }}
            stroke="hsl(222 30% 18%)"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(222 47% 9%)",
              border: "1px solid hsl(222 30% 18%)",
              borderRadius: "8px",
              color: "hsl(210 40% 92%)",
              fontSize: 12,
              fontFamily: "JetBrains Mono",
            }}
          />
          <ReferenceLine y={0.5} stroke="hsl(45 93% 55%)" strokeDasharray="5 5" strokeOpacity={0.5} />
          <Line
            type="monotone"
            dataKey="fakeProbability"
            stroke="hsl(173 80% 50%)"
            strokeWidth={2}
            dot={{ fill: "hsl(173 80% 50%)", r: 3 }}
            activeDot={{ r: 5, fill: "hsl(173 80% 50%)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

