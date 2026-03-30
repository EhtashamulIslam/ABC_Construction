import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Badge, getStatusVariant, getPriorityVariant } from '../components/ui/Badge';
import { ProgressBar, BudgetProgress } from '../components/ui/ProgressBar';
import { dataService } from '../services/dataService';
import { formatCurrency, formatDate } from '../utils/formatters';
import { ArrowLeft, Calendar, User, Users, CheckCircle2 } from 'lucide-react';

export function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const project = dataService.getProjectById(projectId || '');

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Project not found</h2>
        <button
          onClick={() => navigate('/projects')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  const budgetUtilization = (project.budget.spent / project.budget.total) * 100;

  return (
    <div className="space-y-6">
      <div>
        <button
          onClick={() => navigate('/projects')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.name}</h1>
            <p className="text-gray-600">{project.projectId}</p>
          </div>
          <Badge text={project.status} variant={getStatusVariant(project.status)} size="lg" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-2">
            <User className="h-5 w-5 text-gray-400" />
            <h3 className="font-semibold text-gray-900">Project Manager</h3>
          </div>
          <p className="text-lg font-medium text-gray-900">{project.manager.name}</p>
          <p className="text-sm text-gray-600">{project.manager.designation}</p>
          <p className="text-sm text-gray-500 mt-1">{project.manager.email}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <h3 className="font-semibold text-gray-900">Timeline</h3>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Start:</span>
              <span className="text-sm font-medium text-gray-900">
                {formatDate(project.timeline.startDate)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">End:</span>
              <span className="text-sm font-medium text-gray-900">
                {formatDate(project.timeline.endDate)}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-2">
            <CheckCircle2 className="h-5 w-5 text-gray-400" />
            <h3 className="font-semibold text-gray-900">Progress</h3>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-gray-900">{budgetUtilization.toFixed(1)}%</p>
            <ProgressBar progress={budgetUtilization} showLabel={false} height="md" />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Budget Breakdown</h2>
        <div className="mb-6">
          <BudgetProgress
            allocated={project.budget.total}
            spent={project.budget.spent}
            currency="BDT"
          />
        </div>
        <div className="space-y-4">
          {project.budget.categories.map((category, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                <span className="text-sm text-gray-600">
                  {formatCurrency(category.spent)} / {formatCurrency(category.allocated)}
                </span>
              </div>
              <ProgressBar
                progress={(category.spent / category.allocated) * 100}
                height="sm"
                showLabel={false}
              />
              {category.subCategories && category.subCategories.length > 0 && (
                <div className="mt-4 ml-4 space-y-2">
                  {category.subCategories.map((sub, subIndex) => (
                    <div key={subIndex} className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700">{sub.name}</span>
                        <span className="text-gray-600">
                          {formatCurrency(sub.spent)} / {formatCurrency(sub.allocated)}
                        </span>
                      </div>
                      <ProgressBar
                        progress={(sub.spent / sub.allocated) * 100}
                        height="sm"
                        showLabel={false}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-5 w-5 text-gray-400" />
            <h2 className="text-xl font-bold text-gray-900">Teams</h2>
          </div>
          {project.teams.length > 0 ? (
            <div className="space-y-4">
              {project.teams.map((team) => (
                <div key={team.teamId} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">{team.name}</h3>
                  <div className="space-y-2">
                    {team.members.map((member, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">{member.name}</span>
                        <Badge text={member.role} variant="default" size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No teams assigned yet</p>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Milestones</h2>
          <div className="space-y-3">
            {project.timeline.milestones.map((milestone) => (
              <div
                key={milestone.milestoneId}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
              >
                <span className="text-gray-900">{milestone.title}</span>
                <Badge text={milestone.status} variant={getStatusVariant(milestone.status)} size="sm" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Tasks</h2>
        <div className="space-y-3">
          {project.tasks.map((task) => (
            <div key={task.taskId} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{task.title}</h3>
                  <p className="text-sm text-gray-600">Assigned to: {task.assignedTeam}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge text={task.priority} variant={getPriorityVariant(task.priority)} size="sm" />
                  <span className="text-sm font-medium text-gray-700">{task.progress}%</span>
                </div>
              </div>
              <ProgressBar progress={task.progress} showLabel={false} height="sm" />
              {task.subTasks.length > 0 && (
                <div className="mt-3 ml-4 space-y-1">
                  {task.subTasks.map((subTask) => (
                    <div key={subTask.subTaskId} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{subTask.title}</span>
                      <Badge text={subTask.status} variant={getStatusVariant(subTask.status)} size="sm" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {project.risks.length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Risks</h2>
          <div className="space-y-3">
            {project.risks.map((risk) => (
              <div key={risk.riskId} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-medium text-gray-900">{risk.description}</p>
                  <Badge text={risk.severity} variant={getPriorityVariant(risk.severity)} size="sm" />
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Mitigation:</span> {risk.mitigation}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
