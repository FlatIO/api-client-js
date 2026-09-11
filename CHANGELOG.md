# Changelog

## [1.0.0](https://github.com/FlatIO/api-client-js/compare/v0.6.0...v1.0.0) (2026-09-11)

The first stable release of the 1.x line. Regenerated against API specification 2.26.1, covering
all 123 public operations. See [MIGRATION.md](MIGRATION.md) for the upgrade from 0.x.

### Features

* Typed errors: an API failure throws `FlatNotFoundError`, `FlatAuthenticationError` and the rest
  of the `FlatError` hierarchy, rather than one generic error carrying a status code.
* Retries with backoff, applied to every request including transport failures. Flat returns HTTP
  403 for rate limiting with the reset in `X-RateLimit-Reset`, so the decision reads the response
  body's `code` to tell a throttle from a genuine authorization failure.
* Pagination that follows the `Link` header cursor, which the specification does not declare.
* OAuth2 with transparent token refresh on expiry.
* A finite request timeout, and `FlatClient` as a single entry point over the ten generated APIs.

### Breaking Changes

* Requires Node 22 or later.
* No runtime dependencies. The package previously depended on axios, which it never used.
* Models and operations are regenerated, so names follow the current specification.

## 0.6.0 (API v2.6.0)

* feat(collections): Add new Collections API endpoints
  * `POST /collections`: Create new collection
  * `GET /collections`: List collections
  * `GET /collections/{collection}`: Get collection details
  * `PUT /collections/{collection}`: Update collection details
  * `DELETE /collections/{collection}`: Delete collection
  * `POST /collections/{collection}/untrash`: Untrash collection
  * `GET /collections/{collection}/scores`: List scores contained in a collection
  * `PUT /collections/{collection}/scores/{score}`: Add a score to a collection
  * `DELETE /collections/{collection}/scores/{score}`: Remove a score from a collection
* feat(collections): Add new OAuth2 scopes for new features:
  * `collections.readonly`: Allow read-only access to a user's collections.
  * `collections.add_scores`: Allow to add scores to a user's collections.
  * `collections`: Full, permissive scope to access all of a user's collections.
* feat(score): Added new method to untrash a score (`POST /v2/scores/{score}/untrash`)
* feat(score): `DELETE /v2/scores/{score}` can now be used without admin rights. This new behavior will unshare the score from the current account.
* feat(score): `POST /scores/{score}/fork` now accepts a collection identifier to copy a score to a specific collection.
* feat(comments): Comments can now be filtered by type with the new query string `type` (`document` or `inline`).
* update(openapi): Some schema definitions have been renamed, they are now used for Scores and Collections
  * `ScoreRights` -> `ResourceRights`
  * `ScoreCollaborator` -> `ResourceCollaborator`
  * `ScoreCollaboratorCreation` -> `ResourceCollaboratorCreation`
  * existing _score sharing key_ -> `ResourceSharingKey`
* **DEPRECATED**: `GET /scores/{score}/revisions/{revision}/{format}` no longer support part indexes for single/set of parts exports, but our own part UUIDs.
* **DEPRECATED** on 2019-01-01: `GET /users/{user}/scores` will no longer list private and shared scores, but only public scores of a Flat account.

### API v2.5.0 to v2.5.2

* feat(scores): Add video & audio tracks support for scores: `/v2/scores/{score}/tracks`.
* fix(user): Add missing escape in `pattern` (`UserCreation.username`).
* fix(score): missing ScoreRights.aclRead type

## 0.5.0 (API v2.4.0)

* feat(scores): New metadata and update of `PUT /v2/scores/{score}`:
  * Added metadata in API `subtitle`, `lyricist`, `composer`, `description`, `tags`, `creationType`, `license`, `licenseText`, `durationTime`, `numberMeasures`, `mainTempoQpm`, `publicationDate`.
  * `PUT /v2/scores/{score}`: Remove `title` property, this one can be updated by saving a new revision of the score data.
  * `PUT /v2/scores/{score}`: New settable properties: `description`, `tags`, `creationType`, `license`.

## 0.4.0 (API v2.3.0)

* feat(user): Add profile theme and instruments played.
* feat(edu): Add new cursor-based pagination for `GET /v2/organizations/users` and `GET /v2/organizations/invitations`.
* feat(edu): Add new methods:
  * `PUT /v2/organizations/users/{user}`: Admin endpoint to update managed accounts.
    * `DELETE /v2/organizations/users/{user}`: Admin endpoint to delete or convert edu accounts to consumer accounts.
    * feat(edu): Classes have a new state `inactive` that can be activated using the new method `POST /v2/classes/{class}/activate`.
    * feat(edu): Assignments have a new state `draft` and can have a new attachment type `exercise`.
    * feat(edu): Return Canvas LMS Instance domain in classes details
    * feat(edu): Return Clever.com section information in classes details

## 0.3.0 (API v2.2.0)

* feat(edu): Public release of the first education APIs:
  * `/v2/classes`: Classes management
  * `/v2/classes/{class}/assignments`: Flat Assignments and Submissions
  * `/v2/organizations/users`: Organization accounts management
  * `/v2/organizations/invitations`: Organization invitations for admins and teachers
  * `/v2/organizations/lti/credentials`: LTI credentials management
  * `/v2/groups/{group}` and `/groups/{group}/users`: List of groups and users part of groups
  * `/scores/{score}/submissions`: Submissions linked to a score
* feat(edu): New OAuth2 scopes:
  * `edu.classes`: Full, permissive scope to manage the classes.
  * `edu.classes.readonly`: Read-only access to the classes.
  * `edu.assignments`: Read-write access to the assignments and submissions.
  * `edu.assignments.readonly`: Read-only access to the assignments and submissions.
  * `edu.admin`: Full, permissive scope to manage all the admin of an organization.
  * `edu.admin.lti`: Access and manage the LTI Credentials for an organization.
  * `edu.admin.lti.readonly`: Read-only access to the LTI Credentials of an organization.
  * `edu.admin.users`: Access and manage the users and invitations of the organization.
  * `edu.admin.users.readonly`: Read-only access to the users and invitations of the organization.
* fix(spec): Add missing scopes in specification for `GET /scores/{score}/revisions/{revision}` and `GET /scores/{score}/revisions/{revision}/{format}`

## 0.2.0

* feat(scores): add support of private links sharing with `sharingKey`.
* feat(comments): Make "revision" optional when creating comments and support of "last" keyword.
* fix(revisions): Missing `id` property in `ScoreRevision`.
* update(spec): Specify `binary` response type for `GET /scores/{score}/revisions/{revision}/{format}`

## 0.1.0

Initial release
