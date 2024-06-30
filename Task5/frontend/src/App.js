import { BrowserRouter as Router,Route, Link, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css'
import { HomePage } from './components/home.page'
import { RQtasksPage } from './components/RQtasks.page'
import { TasksPage } from './components/tasks.page'

const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/tasks'>Traditional Tasks</Link>
              </li>
              <li>
                <Link to='/rq-tasks'>RQ Tasks</Link>
              </li>
            </ul>
          </nav>
          <Routes>
          <Route path='/tasks' element={<TasksPage />} />
            <Route path='/rq-tasks' element={<RQtasksPage />} />
            <Route path='/' element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App