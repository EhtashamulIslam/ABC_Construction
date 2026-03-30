import { StatCard } from '../components/ui/Card';
import { Badge, getStatusVariant } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { dataService } from '../services/dataService';
import { FolderKanban, DollarSign, ListTodo, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const navigate = useNavigate();
  const company = dataService.getCompanyInfo();
  const projects = dataService.getAllProjects();
  const tasks = dataService.getAllTasks();
  const payments = dataService.getAllPayments();
  const totalBudget = dataService.getTotalBudget();
  const totalSpent = dataService.getTotalSpent();
  const pendingApprovals = dataService.getPendingApprovals();

  const budgetUtilization = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  const activeProjects = projects.filter(p => p.status === 'In Progress').length;
  const completedTasks = tasks.filter(t => t.progress === 100).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to {company.name} ERP System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Projects"
          value={projects.length}
          subtitle={`${activeProjects} active projects`}
          icon={<FolderKanban className="h-8 w-8" />}
        />
        <StatCard
          title="Total Budget"
          value={formatCurrency(totalBudget)}
          subtitle={`${budgetUtilization.toFixed(1)}% utilized`}
          icon={<DollarSign className="h-8 w-8" />}
        />
        <StatCard
          title="Tasks Completed"
          value={`${completedTasks}/${tasks.length}`}
          subtitle={`${((completedTasks / tasks.length) * 100).toFixed(0)}% completion rate`}
          icon={<ListTodo className="h-8 w-8" />}
        />
        <StatCard
          title="Pending Approvals"
          value={pendingApprovals}
          subtitle="Payment requests"
          icon={<AlertCircle className="h-8 w-8" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Budget Overview</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Total Budget</span>
                <span className="text-gray-900 font-semibold">{formatCurrency(totalBudget)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Total Spent</span>
                <span className="text-gray-900 font-semibold">{formatCurrency(totalSpent)}</span>
              </div>
              <div className="flex justify-between text-sm mb-3">
                <span className="font-medium text-gray-700">Remaining</span>
                <span className="text-green-600 font-semibold">
                  {formatCurrency(totalBudget - totalSpent)}
                </span>
              </div>
              <ProgressBar progress={budgetUtilization} height="lg" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Projects</h2>
          <div className="space-y-3">
            {projects.slice(0, 3).map((project) => (
              <div
                key={project.projectId}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
                onClick={() => navigate(`/projects/${project.projectId}`)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  <Badge text={project.status} variant={getStatusVariant(project.status)} size="sm" />
                </div>
                <p className="text-sm text-gray-600 mb-2">{project.manager.name}</p>
                <ProgressBar
                  progress={(project.budget.spent / project.budget.total) * 100}
                  showLabel={false}
                  height="sm"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-3xl font-bold text-blue-600">{activeProjects}</p>
            <p className="text-sm text-gray-600 mt-1">Active Projects</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
            <p className="text-sm text-gray-600 mt-1">Completed Tasks</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-3xl font-bold text-yellow-600">{payments.length}</p>
            <p className="text-sm text-gray-600 mt-1">Total Payments</p>
          </div>
        </div>
      </div>
    </div>
  );
}
