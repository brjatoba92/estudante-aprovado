// components/layout/UserAvatar.js
import React, { useState, useRef, useEffect } from 'react';
import { 
  HiUser, 
  HiCog, 
  HiLogout, 
  HiPencil,
  HiPhotograph,
  HiCheck
} from 'react-icons/hi';
import { useUser } from '../../contexts/UserContext';

const UserAvatar = () => {
  const { user, updateAvatar, updateName } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const menuRef = useRef(null);

  // Avatares pré-definidos (como Netflix)
  const predefinedAvatars = [
    'JS', 'US', 'AL', 'PF', 'ST', 'PL', 'DR', 'PR',
    '🦊', '🐱', '🐼', '🐨', '🦁', '🐯', '🐶', '🐵'
  ];

  // Fechar menu quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setIsEditingName(false);
        setShowAvatarPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNameUpdate = () => {
    if (newName.trim()) {
      updateName(newName.trim());
    }
    setIsEditingName(false);
  };

  const handleAvatarSelect = (avatar) => {
    updateAvatar(avatar);
    setShowAvatarPicker(false);
  };

  const handleLogout = () => {
    // Futura implementação de logout
    console.log('Logout clicked');
    setIsMenuOpen(false);
  };

  return (
    <div className="user-avatar-container" ref={menuRef}>
      {/* Avatar Button */}
      <button 
        className="avatar-button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="avatar-circle">
          {user.avatar}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="user-menu">
          {/* Header do Menu */}
          <div className="user-menu-header">
            <div className="avatar-circle large">
              {user.avatar}
            </div>
            <div className="user-info">
              {isEditingName ? (
                <div className="name-editor">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleNameUpdate()}
                    className="name-input"
                    autoFocus
                  />
                  <button 
                    onClick={handleNameUpdate}
                    className="confirm-btn"
                  >
                    <HiCheck size={16} />
                  </button>
                </div>
              ) : (
                <div className="user-details">
                  <strong>{user.name}</strong>
                  <span>Concurso: {user.concurso}</span>
                </div>
              )}
            </div>
          </div>

          {/* Menu Items */}
          <div className="menu-items">
            {!isEditingName && (
              <button 
                className="menu-item"
                onClick={() => setIsEditingName(true)}
              >
                <HiPencil size={18} />
                <span>Alterar Nome</span>
              </button>
            )}

            <button 
              className="menu-item"
              onClick={() => setShowAvatarPicker(!showAvatarPicker)}
            >
              <HiPhotograph size={18} />
              <span>Alterar Avatar</span>
            </button>

            {/* Avatar Picker */}
            {showAvatarPicker && (
              <div className="avatar-picker">
                <h4>Escolha seu avatar:</h4>
                <div className="avatar-grid">
                  {predefinedAvatars.map((avatar, index) => (
                    <button
                      key={index}
                      className={`avatar-option ${user.avatar === avatar ? 'selected' : ''}`}
                      onClick={() => handleAvatarSelect(avatar)}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button className="menu-item">
              <HiCog size={18} />
              <span>Configurações</span>
            </button>

            <hr className="menu-divider" />

            <button 
              className="menu-item logout"
              onClick={handleLogout}
            >
              <HiLogout size={18} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;