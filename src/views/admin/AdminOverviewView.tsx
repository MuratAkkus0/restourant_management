import AdminPanelsPagesContainer from '../../components/templates/AdminPanelsPagesContainer';
import { Chart } from 'react-google-charts';

function AdminOverviewView() {
  const data = [
    ['Personal', 'Complated Order', { role: 'style' }],
    ['Ali', 12, '#b87333'],
    ['Veli', 30, 'silver'],
    ['Mert', 20, 'gold'],
    ['Cengiz', 29, 'color: #e5e4e2'],
  ];
  return (
    <AdminPanelsPagesContainer>
      <Chart chartType="ColumnChart" width="80%" height="80%" data={data} />
    </AdminPanelsPagesContainer>
  );
}

export default AdminOverviewView;
