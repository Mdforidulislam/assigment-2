import mongoose from 'mongoose';




import app from './app';
import config from './src/app/config';


async function main() {
  try {
    await mongoose.connect(config.database_url as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process with a failure code
  }
}

main();