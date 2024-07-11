module.exports = {
  apps: [
    {
      name: "taobao-front", // Name of your frontend application
      script: "npm", // Command to start the frontend
      args: "start", // Arguments for the start command
      cwd: "/root/taobao-front", // Directory of your frontend project
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
