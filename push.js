import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
import fs from 'fs';
import path from 'path';

const dir = path.resolve('.');

async function push() {
  const token = process.env.GITHUB_TOKEN || process.argv[2];

  if (!token || token === 'YOUR_GITHUB_PAT') {
    console.error('\n❌ GitHub Personal Access Token required!');
    console.log('\nUsage:');
    console.log('  npm run git-push -- ghp_YourActualGitHubTokenHere');
    console.log('\nGenerate a token at: https://github.com/settings/tokens/new (Select "repo" scope)');
    process.exit(1);
  }

  console.log('🚀 Pushing to https://github.com/tanabanafabricsonline/tanabanafabrics.git via Pure JS...');

  try {
    const result = await git.push({
      fs,
      http,
      dir,
      remote: 'origin',
      ref: 'main',
      force: true,
      onAuth: () => ({ username: token }),
    });

    console.log('✅ Successfully pushed to GitHub main branch!');
    console.log(result);
  } catch (err) {
    console.error('❌ Push error:', err.message);
  }
}

push();
