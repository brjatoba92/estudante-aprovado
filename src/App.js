// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StudyProvider } from './contexts/StudyContext';
import Home from './components/home/Home';
import './styles/home.css';

// Import dos componentes que vamos criar depois (para evitar erros)
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

// Componente de Layout com Navegação
const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>📚 StudyPlanner</h2>
          <p>Preparação para Concursos</p>
        </div>
        
        <ul className="sidebar-menu">
          <li className="menu-item active">
            <span>🏠 Home</span>
          </li>
          <li className="menu-item">
            <span>📋 Planos</span>
          </li>
          <li className="menu-item">
            <span>📄 Editais</span>
          </li>
          <li className="menu-item">
            <span>📚 Disciplinas</span>
          </li>
          <li className="menu-item">
            <span>📅 Planejamento</span>
          </li>
          <li className="menu-item">
            <span>✍️ Registro</span>
          </li>
          <li className="menu-item">
            <span>📊 Estatísticas</span>
          </li>
          <li className="menu-item">
            <span>🔄 Revisões</span>
          </li>
          <li className="menu-item">
            <span>📈 Histórico</span>
          </li>
          <li className="menu-item">
            <span>🎯 Simulados</span>
          </li>
        </ul>
        
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">US</div>
            <div className="user-details">
              <strong>Usuário</strong>
              <span>Concurso: PF - 2024</span>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <StudyProvider>
      <Router>
        <div className="App">
          <Layout>
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
          </Layout>
        </div>
      </Router>
    </StudyProvider>
  );
}

export default App;