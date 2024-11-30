# Repository Organisation Guide

This page provides recommendations and best practices for organising a repository.

## Folder Structure

A well-structured repository is essential for collaboration and code sharing. Consider the following folder structure:
```
root/
│
├── .build/
├── .github/
├── src/
├── test/
├── docs/
├── dep/
├── data/
├── res/
├── .build/
├── .gitignore
├── LICENSE
├── README.md
│── CODE_OF_CONDUCT.md
└── ...
```

- `.build/`: Typically store files and artefacts generated during the build process of a project.
- `.github/`: Contains configuration files and resources related to GitHub.
- `src/`: Contains source code.
- `test/`: Store integration, unit, and other tests.
- `docs/`: Documentation files, including user guides and developer guides. Also see [Wikis](https://github.com/sergiomrebelo/ldc-repository-example/wiki).
- `dep/` or `libs/`: External libraries or dependencies.
- `data/`: Data files and databases.
- `res/`: Results of the project, include static resources, such as images, and papers.
- `.build/` or `build/`: Contains all build process-related scripts, such as Docker compose and PowerShell.
- `.gitignore`: Specifies files or directories to be ignored by version control.
- `LICENSE`: Contains project licensing information.
- `README.md`: The project's README file.
- `CODE_OF_CONDUCT.md`: specifies the Code of Conduct of the Project.

By default, configuration files are stored in the project root. Alternatively, you can use a `config/` folder to store configuration files and scripts. 

If possible, use package managers, such as [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/). In these cases, external libraries and dependencies must not be included in the repository.

## Branches

Branches are essential for managing different aspects of your project's development. Branches must be related to a feature/issue. Example branch names:

- **Main Branch**: Represents the stable version of your project.
- **Dev Branches**: Used for developing new features or enhancements.
- **define-directory-structure Branch**: Created to develop the feature/issue [#1](https://github.com/sergiomrebelo/ldc-repository-example/issues/1).
- **issue-n Branch**: Created to develop the issue n.

## Pull Requests

Pull requests (PRs) are how you propose changes to your repository. When an issue is developed you must open a [PR](https://github.com/sergiomrebelo/ldc-repository-example/pulls) to merge your branch into the main branch.
If possible, request reviews from team members to ensure code quality and after receiving approval, merge the PR into the main branch.



