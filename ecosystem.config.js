module.exports = {
  apps: [
    {
      name: "next-app",
      script: "npm run start",
      cwd: "/sc-chemistry",
      watch: false,
      autorestart: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
