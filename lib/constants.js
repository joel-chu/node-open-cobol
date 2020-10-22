
const EXT = '.cbl'

module.exports = {
  CMD_NAME: 'cobc',
  NOT_SUPPORTED: 'Unsupported platform, please use the docker version instead',
  NOT_FOUND: `cobc cmd not found`,
  EXT,
  ARG: 'args',
  OPT: 'options',
  NOT_STR_ERR: `Expect input to be string`,
  FILE_NOT_FOUND_ERR: `not found!`,
  NOT_EXPECTED_FILE_ERR: `is not a COBOL ${EXT} file`,
  COMPILE_FLAG: '-x',
  FREE_FLAG: '-F', // for cobc
  DEFAULT_PORT: 3001
}
