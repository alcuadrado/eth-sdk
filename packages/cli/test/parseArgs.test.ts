import { expect } from 'earljs'

import { parseArgs } from '../src/parseArgs'

describe('cli > parseArgs', () => {
  it('parses all optional args', () => {
    const argv = ['', '', ...'-p sdk -o @eth-sdk/client'.split(' ')]
    const cwd = '/root'

    const args = parseArgs({ argv, cwd })

    expect(args).toEqual({
      workingDirPath: '/root/sdk',
      outputRootPath: '/root/@eth-sdk/client',
    })
  })

  it('parses correctly absolute paths', () => {
    const argv = ['', '', ...'-p /home/user1/sdk -o /home/@eth-sdk/client '.split(' ')]
    const cwd = '/root'

    const args = parseArgs({ argv, cwd })

    expect(args).toEqual({
      workingDirPath: '/home/user1/sdk',
      outputRootPath: '/home/@eth-sdk/client',
    })
  })

  it('uses default args', () => {
    const argv = ['', '']
    const cwd = '/root'

    const args = parseArgs({ argv, cwd })

    expect(args).toEqual({
      workingDirPath: '/root/eth-sdk',
      outputRootPath: '/root/node_modules/.eth-sdk/client',
    })
  })
})