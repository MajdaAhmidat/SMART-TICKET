import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [organizer, setOrganizer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Login utilisateur
  const loginUser = async (email, password) => {
    setIsLoading(true);
    try {
      // Simulation d'authentification - à remplacer par API réelle
      await new Promise(resolve => setTimeout(resolve, 1000));
      const userData = {
        id: '1',
        email,
        name: email.split('@')[0],
        type: 'user',
      };
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Inscription utilisateur
  const registerUser = async (name, email, password) => {
    setIsLoading(true);
    try {
      // Simulation d'inscription - à remplacer par API réelle
      await new Promise(resolve => setTimeout(resolve, 1000));
      const userData = {
        id: Date.now().toString(),
        email,
        name,
        type: 'user',
      };
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Login organisateur
  const loginOrganizer = async (email, password) => {
    setIsLoading(true);
    try {
      // Simulation d'authentification - à remplacer par API réelle
      await new Promise(resolve => setTimeout(resolve, 1000));
      const organizerData = {
        id: '1',
        email,
        name: email.split('@')[0],
        companyName: 'Mon Organisation',
        type: 'organizer',
      };
      setOrganizer(organizerData);
      return { success: true, organizer: organizerData };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Inscription organisateur
  const registerOrganizer = async (data) => {
    setIsLoading(true);
    try {
      // Simulation d'inscription - à remplacer par API réelle
      await new Promise(resolve => setTimeout(resolve, 1000));
      const organizerData = {
        id: Date.now().toString(),
        email: data.email,
        name: data.name,
        companyName: data.companyName,
        phone: data.phone,
        type: 'organizer',
      };
      setOrganizer(organizerData);
      return { success: true, organizer: organizerData };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Déconnexion utilisateur
  const logoutUser = () => {
    setUser(null);
  };

  // Déconnexion organisateur
  const logoutOrganizer = () => {
    setOrganizer(null);
  };

  const value = {
    user,
    organizer,
    isLoading,
    isUserLoggedIn: !!user,
    isOrganizerLoggedIn: !!organizer,
    loginUser,
    registerUser,
    loginOrganizer,
    registerOrganizer,
    logoutUser,
    logoutOrganizer,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;



