import Link from 'next/link';

const users = [
  { id: '1', uuid: 'fda218d5-4bb7-4b5d-9e5d-9abdfbdb80c5', name: 'John Doe' },
  { id: '2', uuid: '7a123d45-6c37-4c8e-b8b5-2a78c1cd8304', name: 'Jane Smith' },
  { id: '3', uuid: '52d441ff-7896-4f9c-84cc-4cd5f6b10a0d', name: 'Bob Johnson' },
];

const UserList = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='my-6'>Usuários</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mb-2 text-center">
            <Link className='underline' href={`/dashboard/documents/${user.uuid}`}>
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;