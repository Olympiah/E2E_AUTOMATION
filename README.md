# OrangeHRM E2E Automation

End-to-end test suite for the [OrangeHRM demo](https://opensource-demo.orangehrmlive.com), built with [Playwright](https://playwright.dev) + TypeScript using the Page Object Model.

## Stack

- **Playwright Test** — test runner, browser automation, tracing/reporting
- **TypeScript** — strict mode
- **Page Object Model** — one class per screen (`src/pages/`)
- **Custom fixtures** — page objects injected into tests via `test.extend()` (`src/fixtures/pageFixtures.ts`)
- **GitHub Actions** — CI on push/PR (smoke) and nightly (full regression)

## Project structure

```
src/
  pages/        Page Object classes (BasePage + one per module)
  fixtures/      pageFixtures.ts — wires page objects into the test runner
  data/          test data (credentials, generators)
tests/
  global.setup.ts   logs in once, saves session to playwright/.auth/user.json
  *.spec.ts          one spec file per module
playwright.config.ts
.github/workflows/e2e.yml
```

## Design notes

- **Auth runs once.** A `setup` project (`tests/global.setup.ts`) logs in and saves `storageState`. The `chromium` project depends on it and starts every test already authenticated — except `login.spec.ts`, which explicitly resets to a logged-out state since it tests the login form itself.
- **Serial execution.** `opensource-demo.orangehrmlive.com` is a shared public demo instance we don't control. Running tests in parallel caused flakiness/timeouts under contention, so `playwright.config.ts` runs with `workers: 1` and one retry. Expect this suite to be less parallel-friendly than one against an app you own.
- **Tags, not folders.** Tests are tagged `@smoke` / `@regression` in their titles. CI runs `@smoke` on every push/PR and the full suite (`@smoke|@regression`) nightly and on manual dispatch.
- **Firefox project is disabled for now** (commented out in `playwright.config.ts`). It requires `npx playwright install firefox` locally and in CI; re-enable both once you want cross-browser coverage.

## Getting started

```bash
npm install
npx playwright install --with-deps chromium firefox
cp .env.example .env   # adjust credentials if needed
```

## Running tests

```bash
npm test                 # full suite, chromium + firefox
npm run test:smoke       # @smoke only
npm run test:regression  # @regression only
npm run test:headed      # see the browser
npm run test:ui          # Playwright's interactive UI mode
npm run report            # open the last HTML report
```

## CI/CD

`.github/workflows/e2e.yml` runs on:

- **push / PR to `main`** — `@smoke` suite
- **nightly cron (02:00 UTC)** — full suite (`@smoke` + `@regression`)
- **manual dispatch** — choose `smoke` or `regression`

Set these in the repo's GitHub Settings if you don't want to rely on the defaults:

- `vars.BASE_URL` (optional, defaults to the OrangeHRM demo URL)
- `secrets.LOGIN_USERNAME`, `secrets.LOGIN_PASSWORD`

HTML reports and failure traces/screenshots/videos are uploaded as workflow artifacts — download `playwright-report` (and `test-results` on failure) from the run's **Artifacts** section and open `index.html`, or `npx playwright show-report <folder>` / `npx playwright show-trace <trace.zip>` locally.

### Failure notifications

If a full regression run fails (nightly cron, or manual dispatch with `suite: regression`), the workflow auto-files a GitHub Issue labeled `e2e-failure` linking to the failing run. If one is already open, it adds a comment instead of creating a duplicate — so repeated nightly failures thread onto the same issue until someone closes it. This uses the built-in `GITHUB_TOKEN` (needs `permissions: issues: write`, already set), no extra secrets required. Smoke-only failures (every push/PR) don't file an issue — those are visible immediately via the PR/commit status check.

## Debugging a failure

```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```
