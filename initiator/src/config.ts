import assert from 'assert/strict';
import { config } from 'dotenv';

function checkEnv(envName: string): string {
  const env = process.env[envName];
  assert.notStrictEqual(env, undefined);
  return env as string;
}

config();

export default {
  gear: {
    ws: process.env.GEAR_WS_ADDRESS || 'ws://localhost:9944',
    oracle: checkEnv('ORACLE_ADDRESS'),
    pathToMeta: checkEnv('PATH_TO_ORACLE_META'),
  },
  chainlink: {
    url: checkEnv('CL_URL'),
    inAccessKey: checkEnv('CL_IN_ACCESS_KEY'),
    inSecret: checkEnv('CL_IN_SECRET'),
    outAccessKey: checkEnv('CL_OUT_ACCESS_KEY'),
    outSecret: checkEnv('CL_OUT_SECRET'),
  },
};
