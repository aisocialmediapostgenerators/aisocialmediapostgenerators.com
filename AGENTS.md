# Repository workflow

## Git identity and SSH

- Use the repository-local Git identity `aisocialmediapostgenerators <311753647+aisocialmediapostgenerators@users.noreply.github.com>`.
- Keep `user.useConfigOnly=true` so commits never fall back to a global identity such as `xifarm`.
- Access `origin` through the `github.aisocialpost` SSH host with `C:/Users/Administrator/.ssh/id_ed25519_aisocialpost` and `IdentitiesOnly=yes`.
- When asked to commit code, commit and immediately push the resulting commit to the current upstream branch. Report the commit hash, message, remote, and branch.
