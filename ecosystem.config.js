module.exports = {
  apps: [
    {
      name: "front", // Name of your frontend application
      script: "npm", // Command to start the frontend
      args: "start", // Arguments for the start command
      cwd: "/home/alexsoft1/onway", // Directory of your frontend project
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
