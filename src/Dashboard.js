

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";

const new_data = [
  { name: "Shopping", value: 18.47 },
  { name: "Education", value: 27.85 },
  { name: "Social Media", value: 18.29 },
  { name: "Coding/Development", value: 72.15 },
  { name: "News", value: 0.0 },
  { name: "Entertainment", value: 20.27 },
  { name: "Work/Productivity", value: 18.61 },
  { name: "Gaming", value: 28.34 },
  { name: "Video Streaming", value: 0.0 },
  { name: "Health & Fitness", value: 12.67 },
  { name: "Unknown", value: 0.29 },
];

const new1_data = [
  { name: "Productive", value: 68 },
  { name: "Distractive", value: 30 },
  { name: "Others", value: 2 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const labelColor = "#000000";

  return (
    <g>
      <text
        x={x}
        y={y}
        fill={labelColor}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    </g>
  );
};

const Dashboard = () => {
  // console.log("Data:", data);
  return (
    <div className="py-[1px]">
      <div className="flex items-center justify-between fixed w-[100%] pr-10 pl-5 bg-white z-50 py-2">
        <img src="Images/logo.png" alt="Logo" className="w-28 py-2" />
      </div>

      <div className="flex items-start">
        <div className="w-5/12">
          <div className="flex items-center justify-center mt-20">
            {/* {data.gender === "Male" ? (
              <img
                src="Images/boy.jpg"
                alt="Male Avatar"
                className="w-30 -mt-10"
              />
            ) : (
              <img
                src="Images/girl.jpg"
                alt="Female Avatar"
                className="w-30 -mt-10"
              />
            )} */}
          </div>
          <div className="flex items-center justify-center -mt-16">
            {/* <h1 className="font-semibold text-4xl">{data?.name}</h1> */}
          </div>
        </div>
        <div className="w-7/12 p-10">
          <h1>Your Digital Wellbeing</h1>
          <div className="w-full mx-auto my-20">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={new_data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={new1_data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={150}
                  dataKey="value"
                  className="text-bold"
                >
                  {new1_data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;