# Security policy

Module/01 is a component library that other apps install, so a flaw here can reach every one of
them. Security reports come first.

## Reporting a vulnerability

Report it privately on GitHub: open the repository's **Security** tab and choose **Report a
vulnerability**. Please don't open a public issue or pull request for it.

Include what you found, how to reproduce it and what an attacker could do with it. Expect an
acknowledgement within a week. This is a personal project maintained in spare time, so a fix may take
longer, but you'll hear how it's going until it ships. You'll be credited in the fix unless you'd
rather not be.

## Supported versions

Only the latest release on npm gets fixes.

## Scope

In scope: the published package (`packages/module-01`), the docs site, and the build and release
setup (`.github/workflows/`).

Out of scope: vulnerabilities in an app that uses the kit, and anything that needs an already
compromised device or browser.

## How releases are protected

- Releases are published from GitHub Actions through npm trusted publishing (OIDC), with
  provenance, so the repository and npm hold no long-lived publish token.
- Workflows pin every action by commit SHA.
