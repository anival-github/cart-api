import dotenv from 'dotenv';

dotenv.config();

const getConfig = () => {
  const configurationObject = process.env;

  if (Object.values(configurationObject).some(item => item === undefined)) {
    throw new Error('Env var has undefined');    
  }

  const PGDB_PASSWORD = process.env.PGDB_PASSWORD as string;
  const PGDB_USER = process.env.PGDB_USER as string;
  const PGDB_REGION = process.env.PGDB_REGION as string;

  if ([PGDB_PASSWORD, PGDB_USER, PGDB_REGION].some(item => item === undefined)) {
    throw new Error('Env var not provided');
  }

  return {
    PGDB_PASSWORD,
    PGDB_USER,
    PGDB_REGION,
  };
}

const config = getConfig();

export default config;
