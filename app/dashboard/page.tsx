import { fetchDashboardData } from '@/app/actions/licitacoes'
import { DashboardContent } from '@/components/dashboard-content'

export const metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const data = await fetchDashboardData()
  return <DashboardContent data={data} />
}
