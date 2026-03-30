export interface Company {
  companyId: string;
  name: string;
  currency: string;
  headOffice: {
    address: string;
    contact: {
      phone: string;
      email: string;
    };
  };
  projects: Project[];
}

export interface Project {
  projectId: string;
  name: string;
  status: string;
  timeline: {
    startDate: string;
    endDate: string;
    milestones: Milestone[];
  };
  manager: Manager;
  teams: Team[];
  budget: Budget;
  tasks: Task[];
  payments: Payment[];
  risks: Risk[];
}

export interface Milestone {
  milestoneId: string;
  title: string;
  status: string;
}

export interface Manager {
  employeeId: string;
  name: string;
  designation: string;
  email: string;
}

export interface Team {
  teamId: string;
  name: string;
  members: TeamMember[];
}

export interface TeamMember {
  name: string;
  role: string;
}

export interface Budget {
  total: number;
  spent: number;
  categories: BudgetCategory[];
}

export interface BudgetCategory {
  name: string;
  allocated: number;
  spent: number;
  subCategories?: SubCategory[];
}

export interface SubCategory {
  name: string;
  allocated: number;
  spent: number;
}

export interface Task {
  taskId: string;
  title: string;
  assignedTeam: string;
  priority: string;
  progress: number;
  subTasks: SubTask[];
  activityLogs: ActivityLog[];
}

export interface SubTask {
  subTaskId: string;
  title: string;
  status: string;
}

export interface ActivityLog {
  date: string;
  updatedBy: string;
  remark: string;
}

export interface Payment {
  paymentId: string;
  amount: number;
  requestedBy: string;
  requestDate: string;
  invoices: Invoice[];
  approvalFlow: ApprovalFlow;
}

export interface Invoice {
  invoiceId: string;
  vendor: string;
  amount: number;
}

export interface ApprovalFlow {
  approvedBy: string;
  approvedDate: string;
  status: string;
}

export interface Risk {
  riskId: string;
  description: string;
  severity: string;
  mitigation: string;
}
