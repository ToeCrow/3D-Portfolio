import app from './src/app';
import dotenv from 'dotenv';

console.log('Server-filen laddad!');

dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
