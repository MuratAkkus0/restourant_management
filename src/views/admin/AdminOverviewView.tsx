import AdminPanelContainer from '../../components/adminPanel/AdminPanelContainer';
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
    <AdminPanelContainer>
      <Chart chartType="ColumnChart" width="80%" height="80%" data={data} />
    </AdminPanelContainer>
  );
}

export default AdminOverviewView;
