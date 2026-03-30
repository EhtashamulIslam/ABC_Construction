import erpData from '../data/erp-data.json';
import { Company, Project, Task, Payment } from '../types/erp.types';

class DataService {
  private data: { company: Company };

  constructor() {
    this.data = erpData as { company: Company };
  }

  getCompanyInfo() {
    return this.data.company;
  }

  getAllProjects(): Project[] {
    return this.data.company.projects;
  }

  getProjectById(projectId: string): Project | undefined {
    return this.data.company.projects.find(p => p.projectId === projectId);
  }

  getAllTasks(): Task[] {
    return this.data.company.projects.flatMap(project => project.tasks);
  }

  getAllPayments(): Payment[] {
    return this.data.company.projects.flatMap(project => project.payments);
  }

  getTotalBudget(): number {
    return this.data.company.projects.reduce((sum, project) => sum + project.budget.total, 0);
  }

  getTotalSpent(): number {
    return this.data.company.projects.reduce((sum, project) => sum + project.budget.spent, 0);
  }

  getPendingApprovals(): number {
    return this.getAllPayments().filter(
      payment => payment.approvalFlow.status === 'Pending'
    ).length;
  }

  getTasksByStatus() {
    const allTasks = this.getAllTasks();
    return {
      toDo: allTasks.filter(task => task.progress === 0),
      inProgress: allTasks.filter(task => task.progress > 0 && task.progress < 100),
      completed: allTasks.filter(task => task.progress === 100)
    };
  }
}

export const dataService = new DataService();
