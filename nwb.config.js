module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'SessionAlertModal',
      externals: {
        react: 'React'
      }
    }
  }
}
