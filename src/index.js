import _ from 'lodash';
import schedule from 'node-schedule';

// compile
const compileConfiguration = (options = {}, bitsConfig) =>
({
  jobs: options.jobs,
  schema: bitsConfig.schema,
  database: bitsConfig.database,
});

// create bit
const initializeJobs = options =>
  bitsConfig => {
    const config = compileConfiguration(options, bitsConfig);

    _.forEach(config.jobs, j => schedule.scheduleJob(j.rule, () => j.job(config.database)));
  };

// export bit
export default options =>
({
  initializeServer: initializeJobs(options),
});

