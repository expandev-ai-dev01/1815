import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-gray-900">404</h2>
      <p className="mt-4 text-lg text-gray-600">Página não encontrada</p>
      <button
        onClick={() => navigate('/')}
        className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Voltar para Home
      </button>
    </div>
  );
};

export default NotFoundPage;
