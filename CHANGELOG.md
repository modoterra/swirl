# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## 2.0.0

### Added

- Added missing text for Code of Conduct.

### Changed

- React is now on version 19.
- Inertia is on version 2. This includes breaking changes. Please refer to https://inertiajs.com/upgrade-guide for more information.

## [1.1.0] - 2024-11-24

### Added

- New Code of Conduct for SWIRL.
- New Contribution guidelines for SWIRL.
- New `--no-git` command to install.sh.
- New `.forge/` directory. Unfortunately, this does not do anything automatic with Forge yet.
- Now using Laravel Octane.
- New `.vscode/` directory with recommendations for extensions.
- New `--no-interaction` option added to `install.sh` script.
- New `--clean` and `-c` alias added to remove SWIRL traces on install.
- Added a Code of Conduct, see [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).
- Added contribution guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md).

### Changed

- Renamed default database to `laravel`.
- All applicable files have been formatted.
- Fixed a cursor display bug in the `install.sh` script.
- Renamed `--dry` option to `--no-deps` and removed alias.

## [1.0.0] - 2024-11-21

### Added

- Initial release of SWIRL.
- Includes shadcn/ui, Tailwind CSS, Inertia, React and Laravel.
