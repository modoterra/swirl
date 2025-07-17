<p align="center">
    <img src="public/logo.png" alt="Swirl" width="180" />
</p>

Swirl is a wonderful mix of shadcn/ui, Tailwind, Inertia, React, Laravel &amp; and a couple of friends. The purpose of this project is to create an opinionated starter for applications that have robust fundamentals and modern capabilities.

## Introduction

Swirl brings together a set of powerful tools to help you build modern web applications with ease:

- **shadcn**: Beautiful, customizable UI components that fit right into your project.
- **Tailwind**: A utility-first CSS framework that lets you style your app quickly and flexibly.
- **React**: A popular JavaScript library for building fast, interactive user interfaces.
- **Inertia**: Seamlessly connects your server-side routes and controllers with a modern single-page app experience.
- **Laravel**: A robust PHP framework that makes backend development enjoyable and productive.

With these technologies, Swirl gives you a solid foundation to start building right away!

## Installation

```sh
sh -c "$(curl -fsSL https://swirl.mdtrr.com/install)"
```

During installation, the script will prompt you for your application name. This name will be automatically converted to a database-friendly format and used to set both the `APP_NAME` and `DB_DATABASE` environment variables. For example:

- **"My Cool Project"** → Database name: `my_cool_project`
- **"E-Commerce Site"** → Database name: `e_commerce_site`
- **"Blog@2024!"** → Database name: `blog_at_2024`

This ensures your database name matches your application name while maintaining compatibility with database naming conventions.

## Extra

### IDE

Swirl comes with recommendations for Visual Studio Code extensions as well as some useful settings that automate code formatting.

### Linting

Swirl includes a Prettier configuration and multiple Prettier plugins for PHP, the Blade templating engine, JavaScript plugin sorting and even Tailwind CSS.

## Changelog

All notable changes to this project will be documented in the [CHANGELOG.md](./CHANGELOG.md) file.

## Contribution

We welcome contributions from the community! Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) file for guidelines on how to get started.

## License

The original code in this repository is licensed under the MIT License © 2024 Modoterra Corporation. See the [LICENSE.md](./LICENSE.md) file for details.

### Third-Party Licenses

This project includes third-party open-source components, such as Laravel, Tailwind CSS, and React, each of which is licensed under its own respective license. For a full list of third-party licenses and attributions, see [ATTRIBUTION.md](./ATTRIBUTION.md).
