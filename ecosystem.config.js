module.exports = {
  apps: [
    {
      name: "front", // Name of your frontend application
      script: "npm", // Command to start the frontend
      args: "start", // Arguments for the start command
      cwd: "/var/www/front/", // Directory of your frontend project
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
