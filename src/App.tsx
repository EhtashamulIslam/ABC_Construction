import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { ProjectsList } from './pages/ProjectsList';
import { ProjectDetails } from './pages/ProjectDetails';
import { TasksTeams } from './pages/TasksTeams';
import { Payments } from './pages/Payments';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />
          <Route path="/tasks" element={<TasksTeams />} />
          <Route path="/payments" element={<Payments />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
