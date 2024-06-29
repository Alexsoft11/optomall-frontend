module.exports = {
  apps: [
    {
      name: 'taobao-front',  // Name of your frontend application
      script: 'npm',  // Command to start the frontend
      args: 'start',  // Arguments for the start command
      cwd: '/root/taobao-front',  // Directory of your frontend project
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'taobao-api',  // Name of your backend application
      script: 'php',
      args: '-S 127.0.0.1:8000 -t public',  // Command to start the Laravel server
      cwd: '/root/taobao-api',  // Directory of your Laravel project
      env: {
        APP_ENV: 'production',
        APP_DEBUG: 'false'
      }
    }
  ]
};
