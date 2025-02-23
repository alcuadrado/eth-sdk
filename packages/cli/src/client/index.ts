import { join } from 'path'

import { Fs, realFs } from '../helpers/fs'
import { SdkDefinition } from '../sdk-def'
import { generateTsClient } from './generateTsClient'
import { transpileClient } from './transpileClient'

export async function generateClient(
  sdkDef: SdkDefinition,
  workingDirPath: string,
  outputPackageRoot: string,
  fs: Fs = realFs,
) {
  fs.ensureDir(outputPackageRoot)
  fs.copy(join(__dirname, '../../static/dot-client-package.json'), join(outputPackageRoot, 'package.json'))

  const randomTmpDir = fs.tmpDir('eth-sdk')
  await generateTsClient(sdkDef, join(workingDirPath, 'abis'), randomTmpDir, fs)
  transpileClient(randomTmpDir, outputPackageRoot, fs)
}
