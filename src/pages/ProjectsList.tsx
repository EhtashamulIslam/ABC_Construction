import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '../components/ui/Table';
import { Badge, getStatusVariant } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { dataService } from '../services/dataService';
import { formatCurrency, formatDate } from '../utils/formatters';

export function ProjectsList() {
  const navigate = useNavigate();
  const projects = dataService.getAllProjects();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects</h1>
          <p className="text-gray-600">Manage and monitor all construction projects</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Projects</p>
          <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableHead>Project Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Manager</TableHead>
            <TableHead>Timeline</TableHead>
            <TableHead>Budget Utilization</TableHead>
            <TableHead>Progress</TableHead>
          </TableHeader>
          <TableBody>
            {projects.map((project) => {
              const budgetPercentage = (project.budget.spent / project.budget.total) * 100;
              return (
                <TableRow
                  key={project.projectId}
                  onClick={() => navigate(`/projects/${project.projectId}`)}
                >
                  <TableCell>
                    <div>
                      <p className="font-semibold text-gray-900">{project.name}</p>
                      <p className="text-xs text-gray-500">{project.projectId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge text={project.status} variant={getStatusVariant(project.status)} />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{project.manager.name}</p>
                      <p className="text-xs text-gray-500">{project.manager.designation}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm text-gray-900">
                        {formatDate(project.timeline.startDate)}
                      </p>
                      <p className="text-xs text-gray-500">
                        to {formatDate(project.timeline.endDate)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{formatCurrency(project.budget.spent)}</span>
                        <span className="text-gray-500">
                          / {formatCurrency(project.budget.total)}
                        </span>
                      </div>
                      <div className="w-32">
                        <ProgressBar progress={budgetPercentage} showLabel={false} height="sm" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-gray-900">
                      {budgetPercentage.toFixed(1)}%
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.projectId}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/projects/${project.projectId}`)}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
              <Badge text={project.status} variant={getStatusVariant(project.status)} size="sm" />
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Project Manager</p>
                <p className="font-medium text-gray-900">{project.manager.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Budget Utilization</p>
                <ProgressBar
                  progress={(project.budget.spent / project.budget.total) * 100}
                  height="md"
                />
              </div>
              <div className="flex justify-between text-sm pt-2 border-t">
                <span className="text-gray-600">Budget:</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(project.budget.total)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Spent:</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(project.budget.spent)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
