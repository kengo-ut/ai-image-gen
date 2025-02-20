"use client";
import Image from "next/image";
import nextConfig from "../../next.config";
const BASE_PATH = nextConfig.basePath || "";
import { useState } from "react";
import React from "react";
import { HealthStatus, HealthVariables } from "@/gen/schema";
import { healthHealthPost } from "@/gen/default/default";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ValueInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="grid w-full max-w-sm items-center gap-1.5">
    <Label className="font-semibold">{label}</Label>
    <Input type="number" value={value} onChange={onChange} />
  </div>
);

const healthCategories: Array<keyof HealthVariables> = [
  "weight",
  "height",
  "systolic_bp",
  "diastolic_bp",
  "glucose",
  "heart_rate",
];

const sampleVariables: HealthVariables = {
  weight: 70,
  height: 175,
  systolic_bp: 118,
  diastolic_bp: 78,
  glucose: 90,
  heart_rate: 75,
};

const HealthStatusChecker = () => {
  const [data, setData] = useState<HealthStatus | null>(null);
  const [healthVariables, setHealthVariables] = useState<HealthVariables>(sampleVariables);
  const handleData = async () => {
    try {
      const res = await healthHealthPost(healthVariables);
      setData(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side - Input form */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Health Parameters</h2>
          <div className="grid gap-4">
            {healthCategories.map((category) => (
              <ValueInput
                key={category}
                label={category}
                value={healthVariables[category]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setHealthVariables({ ...healthVariables, [category]: +e.target.value })
                }
              />
            ))}
            <Button
              onClick={handleData}
              className="mt-4 bg-white text-black font-semibold py-2 px-4 rounded shadow hover:bg-gray-300"
            >
              <Image src={`${BASE_PATH}/file.svg`} alt="file" width={15} height={15} />
              Submit
            </Button>
          </div>
        </div>

        {/* Right side - Results */}
        <div className="md:w-1/2 bg-gray-50 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Results</h2>

          {data ? (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-2">Status: {data.status}</div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      data.status === "健康"
                        ? "bg-green-500"
                        : data.status === "注意"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                    style={{
                      width: `${data.status === "健康" ? 100 : data.status === "注意" ? 50 : 0}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <svg
                className="w-16 h-16 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <p className="text-lg">Submit your health parameters to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthStatusChecker;
