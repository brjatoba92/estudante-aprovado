import React, { useState } from 'react';
import {
    HiHome,
    HiClipboardList,
    HiDocumentText,
    HiBookOpen,
    HiCalendar,
    HiPencilAlt,
    HiChartBar,
    HiRefresh,
    HiClock,
    HiAcademicCap,
    HiMenu,
    HiX
} from 'react-icons/hi';

const Sidebar = ({ isOpen, onClose }) => {
    const menuItems = [
        { name: 'Home', icon: HiHome, link: '/' },
        { name: 'Planos', icon: HiClipboardList, link: '/planos' },
        { name: 'Editais', icon: HiDocumentText, link: '/editais' },
        { name: 'Disciplinas', icon: HiBookOpen, link: '/disciplinas' },
        { name: 'Planejamento', icon: HiCalendar, link: '/planejamento' },
        { name: 'Registro', icon: HiPencilAlt, link: '/registro' },
        { name: 'Estatísticas', icon: HiChartBar, link: '/estatisticas' },
        { name: 'Revisões', icon: HiRefresh, link: '/revisoes' },
        { name: 'Histórico', icon: HiClock, link: '/historico' },
        { name: 'Simulados', icon: HiAcademicCap, link: '/simulados' }
    ];
    
    return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="sidebar-header">
          <button className="close-btn" onClick={onClose}>
            <HiX size={24} />
          </button>
          <div className="logo-section">
            <h2>StudyPlanner</h2>
            <p>Preparação para Concursos</p>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <li key={index} className="menu-item">
                  <a href={item.link} className="menu-link">
                    <IconComponent size={20} />
                    <span>{item.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;