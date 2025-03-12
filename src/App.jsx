import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Create from './components/Create'
import Tasks from './components/Tasks'
 
function App() {

  const toggleDarkMode = () => {
    const isDark = document.body.classList.contains('dark');
    
    document.body.classList.toggle('dark');
    
    localStorage.setItem('darkMode', !isDark);
  };
  
  const initializeDarkMode = () => {
    const savedMode = localStorage.getItem('darkMode');
    
    if (savedMode === 'true') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  initializeDarkMode();

  return (
    <>
      <Header/>
      <Create toggleDarkMode={toggleDarkMode}/>
      <Tasks/>
    </>
  )
}

export default App
