
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const CustomerList = () => {
  const queryClient = useQueryClient();

  const { data: customers = [], isPending, isError } = useQuery({
    queryKey: ['customers'],
    queryFn: () => JSON.parse(localStorage.getItem('customers') || '[]'),
  });

 // on delete customer get updated
  const deleteMutation = useMutation({
    mutationFn: (id) => {
      const updatedCustomers = customers.filter(customer => customer.id !== id);
      localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error loading customers</div>;

  return (
    <div className=' max-w-5xl  w-full'>
      <Link to="/add" className="btn btn-md btn-secondary my-2">
        Add Customer
      </Link>
      <table className="table  border-collapse">
        <thead>
          <tr className="bg-base-300">
            <th className="border p-2">PAN</th>
            <th className="border p-2">Full Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Mobile Number</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="border p-2">{customer.pan}</td>
              <td className="border p-2">{customer.fullName}</td>
              <td className="border p-2">{customer.email}</td>
              <td className="border p-2">+91 {customer.mobileNumber}</td>
              <td className="border p-2">
                <Link
                  to={`/edit/${customer.id}`}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteMutation.mutate(customer.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;