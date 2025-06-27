exports.healthCheck = (req, res) => {
  res.json({
    status: "OK",
    message: "backend-task-User-Auth is running smoothly!",
  });
};
