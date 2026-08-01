import AdminPanelsPagesContainer from '../../components/templates/AdminPanelsPagesContainer';
import { Chart } from 'react-google-charts';

function AdminOverviewView() {
  const data = [
    ['Staff Member', 'Completed Orders', { role: 'style' }],
    ['Staff A', 12, '#b87333'],
    ['Staff B', 30, 'silver'],
    ['Staff C', 20, 'gold'],
    ['Staff D', 29, 'color: #e5e4e2'],
  ];
  return (
    <AdminPanelsPagesContainer>
      <Chart chartType="ColumnChart" width="80%" height="80%" data={data} />
    </AdminPanelsPagesContainer>
  );
}

export default AdminOverviewView;
