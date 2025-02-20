import HealthStatusChecker from "@/components/HealthStatusChecker";

export default function Home() {
  return (
    <div className="container mx-auto p-3">
      <h1 className="text-4xl font-bold text-center">Health Status Checker</h1>
      <p className="text-center text-gray-600 mt-1">
        Check your health status by entering your health parameters
      </p>
      <HealthStatusChecker />
    </div>
  );
}
