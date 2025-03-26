import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const SettingPage = () => {
  return (
    <div>
      <Navbar />

      <div className="flex flex-1 min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-auto">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
              Settings Page
            </h1>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingPage;
