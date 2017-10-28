import minimist from 'minimist';
import config from '../../config/config.json';
import { ArgUtils, Streams, logger } from '../../middlewares';

export const args = minimist(process.argv.slice(2), {
  alias: {
    help: 'h',
    action: 'a',
    file: 'f',
    path: 'p',
    count: 'c',
  },
  unknown: (arg) => {
    logger.error(config.unknown_option, arg);
  },
});

export const argHandler = {
  action: () => ArgUtils.isArgExists(args, 'action'),
  file: () => ArgUtils.isArgExists(args, 'file'),
  path: () => ArgUtils.isArgExists(args, 'path'),
  count: () => ArgUtils.isArgNumber(args, 'count'),
};

export const actionHandler = {
  io: {
    handler: () => {
      if (actionHandler.helper.handler(['file'])) {
        Streams.inputOutput(args.file);
      }
    },
  },

  transform: {
    handler: () => Streams.transform(),
  },

  transform_file: {
    handler: () => {
      if (actionHandler.helper.handler(['file'])) {
        Streams.transformFile(args.file);
      }
    },
  },

  transform_save_file: {
    handler: () => {
      if (actionHandler.helper.handler(['file'])) {
        Streams.transformAndSaveFile(args.file);
      }
    },
  },

  bundle_css: {
    handler: () => {
      if (actionHandler.helper.handler(['path'])) {
        Streams.cssBundler(args.path);
      }
    },
  },

  create_file: {
    handler: () => {
      if (actionHandler.helper.handler(['file', 'count'])) {
        Streams.createFile(args.file, args.count);
      }
    },
  },

  helper: {
    handler: _args => _args.every(requiredArg => argHandler[requiredArg]()),
  },
};
