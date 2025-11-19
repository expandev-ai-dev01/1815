import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-900">Bem-vindo ao GradeBox</h2>
      <p className="mt-4 text-lg text-gray-600">
        Sistema minimalista para registrar e consultar notas de alunos.
      </p>
      <div className="mt-8">
        <button
          onClick={() => navigate('/grades')}
          className="rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700"
        >
          Acessar Gerenciamento de Notas
        </button>
      </div>
    </div>
  );
};

export default HomePage;
