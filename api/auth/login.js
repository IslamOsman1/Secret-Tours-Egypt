export default async function handler(req, res) {
  const [{ default: app }, { connectDB }] = await Promise.all([
    import('../../server/src/app.js'),
    import('../../server/src/config/db.js'),
  ]);

  await connectDB();
  return app(req, res);
}
