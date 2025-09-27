import { useDashboardData } from "../hooks/useDashboardData";
import StatsCards from "../components/StatsCards";
import RecentNewsTable from "../components/RecentNewsTable";
import RecentComments from "../components/RecentComments";
import SpinnerLoader from "../../../components/loaders/SpinnerLoader";
import AdminLayout from "../../../components/layout/AdminLayout";

const Dashboard = () => {
  const { newsData, stats, recentComments, loading } = useDashboardData();

  if (loading) {
    return <SpinnerLoader size={60} color="yellow-500" />;
  }

  return (
    <AdminLayout>
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <StatsCards stats={stats} />
          <RecentNewsTable newsData={newsData} />
          <RecentComments comments={recentComments} />
    </AdminLayout>
  );
};

export default Dashboard;
