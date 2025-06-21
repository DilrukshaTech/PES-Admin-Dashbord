import express from 'express';
import { CategoryRoutes } from './routes/CategoryRoute';

const app = express();

app.use(express.json());
app.use('/categories', CategoryRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
