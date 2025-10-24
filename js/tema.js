const ThemeManager = {
  THEMES: {
    'black-lava': {
      name: 'Black Lava',
      primaryColor: '#ff0015',
      secondaryColor: '#8B0000',
      textColor: '#ffffff',
      backgroundColor: '#000000',
      accentColor: '#ff4d5a',
      cardBg: 'rgba(0, 0, 0, 0.4)',
      navbarBg: 'rgba(0, 0, 0, 0.2)'
    },
    'ocean-green': {
      name: 'Ocean Green',
      primaryColor: '#0EA5E9',
      secondaryColor: '#14B8A6',
      textColor: '#1E293B',
      backgroundColor: '#F8FAFB',
      accentColor: '#06B6D4',
      cardBg: 'rgba(255, 255, 255, 0.35)',
      navbarBg: 'rgba(248, 250, 251, 0.45)'
    }
  },

  STORAGE_KEY: 'portfolio-theme',

  init() {
    console.log('ThemeManager iniciado');
    this.bindEvents();
    this.loadSavedTheme();
  },

  bindEvents() {
    const themeOptions = document.querySelectorAll('.theme-option');
    console.log(`Encontrados ${themeOptions.length} botões de tema`);
    
    themeOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const theme = e.currentTarget.dataset.theme;
        console.log(`Tema selecionado: ${theme}`);
        
        this.applyTheme(theme);
        
        const dropdown = e.currentTarget.closest('.dropdown-menu');
        if (dropdown) {
          const bsDropdown = bootstrap.Dropdown.getInstance(dropdown.previousElementSibling);
          if (bsDropdown) bsDropdown.hide();
        }
        
        return false;
      });
    });
  },

  applyTheme(themeName) {
    const theme = this.THEMES[themeName];
    if (!theme) {
      console.error(`Tema não encontrado: ${themeName}`);
      return;
    }

    console.log(`Aplicando tema: ${theme.name}`);

    const root = document.documentElement;
    const body = document.body;

    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--text-color', theme.textColor);
    root.style.setProperty('--background-color', theme.backgroundColor);
    root.style.setProperty('--accent-color', theme.accentColor);
    root.style.setProperty('--card-bg', theme.cardBg);
    root.style.setProperty('--navbar-bg', theme.navbarBg);

    Object.keys(this.THEMES).forEach(key => {
      body.classList.remove(`theme-${key}`);
    });
    body.classList.add(`theme-${themeName}`);

    this.saveTheme(themeName);
    this.updateThemeLabel(theme.name);
    this.updateActiveState(themeName);
    this.applyThemeSpecificStyles(themeName);
    
    if (typeof window.updateOrbsForTheme === 'function') {
      window.updateOrbsForTheme(themeName);
    }
    
    console.log('Tema aplicado com sucesso!');
  },

  applyThemeSpecificStyles(themeName) {
    const isLight = themeName === 'ocean-green';

    const logoInferior = document.getElementById('logoFatec');
      if (logoInferior) {
        if (themeName === 'ocean-green') {
          logoInferior.style.filter = 'invert(1)';
        } else {
          logoInferior.style.filter = 'none';
        }
      }

      const logos = [document.getElementById('logoDesktop'), document.getElementById('logoMobile')];

      logos.forEach(logo => {
        if (logo) {
          if (themeName === 'ocean-green') {
            logo.style.filter = 'invert(1)';
          } else {
            logo.style.filter = 'none';
          }
        }
      });

    document.querySelectorAll('.card-sobre, .card-projetos, .card-skills, .card-curriculo, .card-contato').forEach(card => {
      if (isLight) {
        card.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        card.style.boxShadow = '0 8px 18px rgba(14, 165, 233, 0.06)';
        card.style.border = '1px solid rgba(14, 165, 233, 0.08)';
      } else {
        card.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
        card.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.6)';
        card.style.border = 'none';
      }
    });

    document.querySelectorAll('.offcanvas.custom-offcanvas').forEach(el => {
      el.style.backgroundColor = isLight ? '#F8FAFB' : '#000000';
    });

    document.querySelectorAll('.btn-close').forEach(btn => {
      if (isLight) {
        btn.classList.remove('btn-close-white');
      } else {
        btn.classList.add('btn-close-white');
      }
    });

    document.querySelectorAll('.navbar-toggler-icon').forEach(icon => {
      if (isLight) {
        icon.style.backgroundImage = "url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='%231E293B' stroke-width='3' stroke-linecap='round' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E\")";
      } else {
        icon.style.backgroundImage = "url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='white' stroke-width='3' stroke-linecap='round' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E\")";
      }
    });
  },

  saveTheme(themeName) {
    try {
      localStorage.setItem(this.STORAGE_KEY, themeName);
      console.log(`Tema salvo no localStorage: ${themeName}`);
    } catch (e) {
      console.warn('Não foi possível salvar o tema no localStorage', e);
    }
  },

  loadSavedTheme() {
    let savedTheme = 'black-lava';
    
    try {
      savedTheme = localStorage.getItem(this.STORAGE_KEY) || 'black-lava';
      console.log(`Tema carregado do localStorage: ${savedTheme}`);
    } catch (e) {
      console.warn('Não foi possível carregar o tema do localStorage', e);
    }
    
    this.applyTheme(savedTheme);
  },

  updateThemeLabel(themeName) {
    const desktopLabel = document.getElementById('theme-label-desktop');
    if (desktopLabel) {
      desktopLabel.textContent = themeName;
    }
  },

  updateActiveState(activeTheme) {
    document.querySelectorAll('.theme-option').forEach(option => {
      if (option.dataset.theme === activeTheme) {
        option.classList.add('active');
        option.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      } else {
        option.classList.remove('active');
        option.style.backgroundColor = '';
      }
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado via DOMContentLoaded');
    ThemeManager.init();
  });
} else {
  console.log('DOM já estava carregado');
  ThemeManager.init();
}
