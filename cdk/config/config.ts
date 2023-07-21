import dotenv from 'dotenv';

dotenv.config();

const getConfig = () => {
  const configurationObject = process.env;

  if (Object.values(configurationObject).some(item => item === undefined)) {
    throw new Error('Env var has undefined');    
  }

  const PGDB_PASSWORD = process.env.PGDB_PASSWORD as string;

  if ([PGDB_PASSWORD].some(item => item === undefined)) {
    throw new Error('Env var not provided');
  }

  return {
    PGDB_PASSWORD,
  };
}

const config = getConfig();

export default config;
