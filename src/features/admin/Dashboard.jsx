import { useDashboardData } from "../../hooks/useDashboardData";
import StatsCards from "../../components/dashboard/StatsCards";
import RecentNewsTable from "../../components/dashboard/RecentNewsTable";
import RecentComments from "../../components/dashboard/RecentComments";
import SpinnerLoader from "../../components/loaders/SpinnerLoader";
import AdminLayout from "../../components/AdminLayout/Layout";

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
