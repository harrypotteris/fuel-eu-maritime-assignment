import app from "./server";
const port = process.env.PORT ?? "4000";
app.listen(Number(port), () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${port}`);
});
