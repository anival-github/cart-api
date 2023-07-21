export enum DeploymentEnv {
  local = 'local',
  nonprod = 'nonprod',
  prod = 'prod',
}

export function deploymentEnv(): DeploymentEnv {
  const env = process.env.DEPLOY_ENVIRONMENT || DeploymentEnv.prod;

  return env as DeploymentEnv;
}
