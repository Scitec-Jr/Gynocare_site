export default function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-(--main-dark-color) text-white mt-12 py-8 px-4 md:px-8">
      <div className="max-w-360 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Gynocare</h3>
            <p className="text-sm text-gray-300">
              Plataforma administrativa para gerenciamento de clínica ginecológica.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-4">Navegação</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li><a href="/adm" className="hover:text-(--main-color) transition">Dashboard</a></li>
              <li><a href="/adm/medicos" className="hover:text-(--main-color) transition">Médicos</a></li>
              <li><a href="/adm/agendamentos" className="hover:text-(--main-color) transition">Agendamentos</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Gynocare. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
