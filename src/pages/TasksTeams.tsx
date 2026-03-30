import { Card } from '../components/ui/Card';
import { Badge, getPriorityVariant, getStatusVariant } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { dataService } from '../services/dataService';
import { Users, ListTodo } from 'lucide-react';

export function TasksTeams() {
  const tasksByStatus = dataService.getTasksByStatus();
  const projects = dataService.getAllProjects();
  const allTeams = projects.flatMap((p) => p.teams);

  const getTaskStatus = (progress: number): string => {
    if (progress === 0) return 'To Do';
    if (progress === 100) return 'Completed';
    return 'In Progress';
  };

  const getProjectName = (taskId: string): string => {
    const project = projects.find((p) => p.tasks.some((t) => t.taskId === taskId));
    return project ? project.name : 'Unknown Project';
  };

  const renderTaskCard = (task: any) => {
    const status = getTaskStatus(task.progress);
    return (
      <Card key={task.taskId} className="p-4 mb-3">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900">{task.title}</h3>
          <Badge text={task.priority} variant={getPriorityVariant(task.priority)} size="sm" />
        </div>
        <p className="text-sm text-gray-600 mb-2">{getProjectName(task.taskId)}</p>
        <p className="text-sm text-gray-600 mb-3">Team: {task.assignedTeam}</p>
        <div className="mb-2">
          <ProgressBar progress={task.progress} height="sm" />
        </div>
        {task.subTasks.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-600 mb-2">Subtasks:</p>
            {task.subTasks.map((subTask: any) => (
              <div key={subTask.subTaskId} className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-700">{subTask.title}</span>
                <Badge text={subTask.status} variant={getStatusVariant(subTask.status)} size="sm" />
              </div>
            ))}
          </div>
        )}
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tasks & Teams</h1>
        <p className="text-gray-600">Manage tasks and view team assignments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-blue-50 rounded-lg">
          <ListTodo className="h-8 w-8 mx-auto text-blue-600 mb-2" />
          <p className="text-3xl font-bold text-blue-600">{tasksByStatus.toDo.length}</p>
          <p className="text-sm text-gray-600 mt-1">To Do</p>
        </div>
        <div className="text-center p-6 bg-yellow-50 rounded-lg">
          <ListTodo className="h-8 w-8 mx-auto text-yellow-600 mb-2" />
          <p className="text-3xl font-bold text-yellow-600">{tasksByStatus.inProgress.length}</p>
          <p className="text-sm text-gray-600 mt-1">In Progress</p>
        </div>
        <div className="text-center p-6 bg-green-50 rounded-lg">
          <ListTodo className="h-8 w-8 mx-auto text-green-600 mb-2" />
          <p className="text-3xl font-bold text-green-600">{tasksByStatus.completed.length}</p>
          <p className="text-sm text-gray-600 mt-1">Completed</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Task Board</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <div className="bg-blue-100 rounded-t-lg px-4 py-3 mb-3">
              <h3 className="font-bold text-blue-900 flex items-center justify-between">
                <span>To Do</span>
                <span className="bg-blue-200 text-blue-900 text-sm px-2 py-1 rounded-full">
                  {tasksByStatus.toDo.length}
                </span>
              </h3>
            </div>
            <div className="space-y-3">
              {tasksByStatus.toDo.length > 0 ? (
                tasksByStatus.toDo.map(renderTaskCard)
              ) : (
                <Card className="p-6 text-center text-gray-500">No tasks</Card>
              )}
            </div>
          </div>

          <div>
            <div className="bg-yellow-100 rounded-t-lg px-4 py-3 mb-3">
              <h3 className="font-bold text-yellow-900 flex items-center justify-between">
                <span>In Progress</span>
                <span className="bg-yellow-200 text-yellow-900 text-sm px-2 py-1 rounded-full">
                  {tasksByStatus.inProgress.length}
                </span>
              </h3>
            </div>
            <div className="space-y-3">
              {tasksByStatus.inProgress.length > 0 ? (
                tasksByStatus.inProgress.map(renderTaskCard)
              ) : (
                <Card className="p-6 text-center text-gray-500">No tasks</Card>
              )}
            </div>
          </div>

          <div>
            <div className="bg-green-100 rounded-t-lg px-4 py-3 mb-3">
              <h3 className="font-bold text-green-900 flex items-center justify-between">
                <span>Completed</span>
                <span className="bg-green-200 text-green-900 text-sm px-2 py-1 rounded-full">
                  {tasksByStatus.completed.length}
                </span>
              </h3>
            </div>
            <div className="space-y-3">
              {tasksByStatus.completed.length > 0 ? (
                tasksByStatus.completed.map(renderTaskCard)
              ) : (
                <Card className="p-6 text-center text-gray-500">No tasks</Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center space-x-3 mb-4">
          <Users className="h-6 w-6 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-900">Teams Overview</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTeams.map((team, index) => (
            <Card key={`${team.teamId}-${index}`} className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">{team.name}</h3>
              <div className="space-y-3">
                {team.members.map((member, memberIndex) => (
                  <div
                    key={memberIndex}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Total Members: <span className="font-semibold text-gray-900">{team.members.length}</span>
                </p>
              </div>
            </Card>
          ))}
          {allTeams.length === 0 && (
            <div className="col-span-3 text-center py-12 text-gray-500">
              No teams available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
