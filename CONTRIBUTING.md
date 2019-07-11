# CONTRIBUTING

Repository is using 📦🚀 semantic-release (and monorepo plugin) for versioning and keeping the changelog. 
Please follow the commit message convention compatible with `cz-conventional-changelog`. To help you do this, 
in root of the repository you can run `yarn cz` to open an interactive commit message creator that will work with your staged files.

Commit messages are linted in pre-commit hook to comply with this tooling!

Each package will be automaticly released with correct semantic version based on the commit messages provided since the last message.
