const { app } = require("./app");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`[backend] Server started on http://localhost:${PORT}`);
});
