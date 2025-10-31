// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StudyProvider } from './contexts/StudyContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Sidebar from './components/layout/Sidebar';
import Home from './components/home/Home';
import { HiMenu, HiMoon, HiSun } from 'react-icons/hi';
import './styles/home.css';

// Componentes placeholder (mantenha os existentes)
const Planos = () => <div className="page-container"><h1>Planos - Em Breve</h1></div>;
const CadastroEditais = () => <div className="page-container"><h1>Cadastro de Editais - Em Breve</h1></div>;
const CadastroDisciplinas = () => <div className="page-container"><h1>Cadastro de Disciplinas - Em Breve</h1></div>;
const Planejamento = () => <div className="page-container"><h1>Planejamento - Em Breve</h1></div>;
const RegistroEstudos = () => <div className="page-container"><h1>Registro de Estudos - Em Breve</h1></div>;
const EditalVerticalizado = () => <div className="page-container"><h1>Edital Verticalizado - Em Breve</h1></div>;
const Revisoes = () => <div className="page-container"><h1>Revisões - Em Breve</h1></div>;
const Historico = () => <div className="page-container"><h1>Histórico - Em Breve</h1></div>;
const Estatisticas = () => <div className="page-container"><h1>Estatísticas - Em Breve</h1></div>;
const Simulados = () => <div className="page-container"><h1>Simulados - Em Breve</h1></div>;

// Componente de botão de alternar tema
const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <button 
      className="theme-toggle" 
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
      title={isDarkMode ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
    >
      {isDarkMode ? <HiSun size={20} /> : <HiMoon size={20} />}
    </button>
  );
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <StudyProvider>
      <Router>
        <div className="App">
          {/* Sidebar */}
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
          />
          
          {/* Conteúdo Principal */}
          <div className="main-content">
            {/* Header com botão do menu */}
            <header className="main-header">
              <button 
                className="menu-toggle"
                onClick={() => setSidebarOpen(true)}
              >
                <HiMenu size={24} />
              </button>
              <div className="header-title">
                <h1>StudyPlanner</h1>
                <p>Preparação para Concursos</p>
              </div>
              <ThemeToggle />
            </header>

            {/* Conteúdo das páginas - Rotas */}
            <div className="page-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/planos" element={<Planos />} />
                <Route path="/editais" element={<CadastroEditais />} />
                <Route path="/disciplinas" element={<CadastroDisciplinas />} />
                <Route path="/planejamento" element={<Planejamento />} />
                <Route path="/registro" element={<RegistroEstudos />} />
                <Route path="/edital-verticalizado" element={<EditalVerticalizado />} />
                <Route path="/revisoes" element={<Revisoes />} />
                <Route path="/historico" element={<Historico />} />
                <Route path="/estatisticas" element={<Estatisticas />} />
                <Route path="/simulados" element={<Simulados />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </StudyProvider>
    </ThemeProvider>
  );
}

export default App;