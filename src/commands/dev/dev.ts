import path from 'path';
import chalk from 'chalk';

import { Output } from '../../util/output';
import { NowContext } from '../../types';
import pkg from '../../../package.json';

import DevServer from './lib/dev-server';

type Options = {
  '--debug': boolean;
  '-d': boolean;
  '--port': number;
  '-p': number;
};

export default async function dev(
  ctx: NowContext,
  opts: Options,
  args: string[],
  output: Output
) {
  output.dim(`Now CLI ${pkg.version} dev (beta) — https://zeit.co/support`);

  const [dir = '.'] = args;
  const cwd = path.join(process.cwd(), dir);
  const port = opts['-p'] || opts['--port'];
  const debug = opts['-d'] || opts['--debug'];
  const devServer = new DevServer(cwd, { output, debug });

  process.once('SIGINT', devServer.stop.bind(devServer));

  await devServer.start(port);
}
