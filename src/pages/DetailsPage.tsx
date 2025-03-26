import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DataTable from "../components/DataTable";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DetailsPage = () => {
  const { user } = useAuth();

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1 min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-auto">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
              Data Dashboard
            </h1>
            <DataTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailsPage;
