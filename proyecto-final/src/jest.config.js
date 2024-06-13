module.exports = {
    // otras opciones de configuración
    moduleFileExtensions: ['js', 'jsx', 'json', 'css'],
    testPathIgnorePatterns: [
      '<rootDir>/node_modules/',
      '<rootDir>/build/',
      '<rootDir>/dist/',
      '<rootDir>/src/**/*.css', // Ignorar archivos CSS
    ],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      },
  };
  
  