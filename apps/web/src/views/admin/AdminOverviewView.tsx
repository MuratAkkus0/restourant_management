import { Chart } from 'react-google-charts';
import { MdCategory, MdCheckCircle, MdInventory, MdPeople } from 'react-icons/md';
import { useGetDashboardStatsQuery } from '@/store/api/companiesApi';
import TitleCardWithIcon from '@/components/molecules/TitleCardWithIcon';

function StatCard({
  label,
  value,
  Icon,
}: {
  label: string;
  value: number | string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <div className="flex-1 min-w-[10rem] bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center text-white flex-shrink-0">
        <Icon size={22} />
      </div>
      <div>
        <p className="text-2xl font-semibold">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}

function AdminOverviewView() {
  const { data: stats, isLoading, isError } = useGetDashboardStatsQuery();

  if (isLoading) {
    return <p className="text-gray-400 p-4">Loading your dashboard...</p>;
  }

  if (isError || !stats) {
    return <p className="text-red-600 p-4">Could not load dashboard data. Please try again.</p>;
  }

  const draftProducts = stats.totalProducts - stats.publishedProducts;
  const chartData = [
    ['Status', 'Products'],
    ['Published', stats.publishedProducts],
    ['Draft', draftProducts],
  ];

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-y-auto">
      <TitleCardWithIcon
        text={stats.isMenuPublished ? 'Your menu is live' : 'Your menu is not published yet'}
        Icon={MdCheckCircle}
        textClassName={stats.isMenuPublished ? 'text-green-600' : 'text-amber-600'}
      />

      <div className="flex flex-wrap gap-4">
        <StatCard label="Categories" value={stats.totalCategories} Icon={MdCategory} />
        <StatCard label="Products" value={stats.totalProducts} Icon={MdInventory} />
        <StatCard label="Published products" value={stats.publishedProducts} Icon={MdCheckCircle} />
        <StatCard label="Team members" value={stats.totalMembers} Icon={MdPeople} />
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 flex-1 flex flex-col">
        <h3 className="font-medium mb-2">Menu composition</h3>
        {stats.totalProducts > 0 ? (
          <Chart chartType="PieChart" width="100%" height="320px" data={chartData} />
        ) : (
          <p className="text-gray-400">
            Add products to your menu to see composition stats here.
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminOverviewView;
