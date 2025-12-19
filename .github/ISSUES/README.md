This folder contains prepared issue descriptions you can open on GitHub.

Quick workflow:
1. Review the issue markdown files in this folder.
2. Run the `create_issues.sh` script (requires `GITHUB_TOKEN` and `GITHUB_USER` environment variables) to post them to GitHub.

Script usage example:
```bash
export GITHUB_TOKEN="ghp_..."
export GITHUB_USER="your-github-username"
./.github/ISSUES/create_issues.sh
```

Notes:
- Titles and bodies are taken from the files; tweak as needed before creating issues.
