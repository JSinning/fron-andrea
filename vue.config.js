module.exports = {
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.ts',
      externals: ['serialport', 'electron-store'],
    },
  },
};
