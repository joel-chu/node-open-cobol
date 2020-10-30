
const EXT = '.cbl'
const DEFAULT_DOCKER_IMAGE = 'joeljiezhu/ubuntu-node-open-cobol'
const CN_SUFFIX = '-cn'

module.exports = {
  
  CMD_NAME: 'cobc',
  DOCKER_NAME: 'docker',
  IMAGE_NAME: 'images',
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
  DEFAULT_PORT: 3001,
  DEFAULT_DOCKER_IMAGE,
  CN_SUFFIX
}
