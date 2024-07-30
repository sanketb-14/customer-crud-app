
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerForm from './components/CustomerForm';
import CustomerList from './components/CustomerList';
import { Link } from 'react-router-dom';
const queryClient = new QueryClient();

function App() {
  return (
    // Wrap the app with QueryClientProvider and pass your QueryClient instance
    <QueryClientProvider client={queryClient}>

      <Router>
        <div className=" w-full flex flex-col h-screen items-center justify-start bg-base-100   max-w-7xl mx-auto p-4">
          <Link to='/' className="text-4xl font-bold text-primary my-4 sm:my-12 w-full text-center">Customer CRUD App</Link>
          
          <Routes>
            <Route path="/" element={<CustomerList />} />
            <Route path="/add" element={<CustomerForm />} />
            <Route path="/edit/:id" element={<CustomerForm />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;