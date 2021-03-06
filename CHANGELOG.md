# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

...

---
### 1.2.5 - 2022-07-21

### Fixed

deps: update dependencies

---
### 1.2.4 - 2022-04-01

### Fixed

deps: update dependencies

---
### 1.2.3 - 2022-01-20

### Changed

- Reset size criterial.

---
### 1.2.2 - 2022-01-12

### Changed

- Export For Module - added entry to export for module.

---
### 1.2.1 - 2022-01-12

### Changed

- PageInfo - added more details on page info payload.

```ts
{
	...
	sizePerPage: 7,
	currentItem: 1,
	page: {
		current: 2,
		of: 6
	}
}
```

---
### 1.2.0 - 2022-01-11

### Changed

- PageInfo - payload, changed from cursor key to fistCursor and lastCursor.
To go next page use lastCursor, and to go back previous page use firstCursor as reference.

---
### 1.1.4 - 1.1.7 - 2022-01-11

### Added

- Added support to browser

---
### 1.1.3 - 2022-01-11

### Changed

- Types - changed types for auto inference.
- Error Message - changed attribute key from hard code to dynamic name.

---
### 1.1.2 - 2022-01-10

### Fixed

- Pager - total count. It was computing 1 item less

---
### 1.1.1 - 2022-01-10

### Fixed

- Pager - previous cursor when size is greater than available data. Now first register returns by default if no data exists.

---

### 1.1.0 - 2022-01-10

### Changed

- Lib - change lib from function to class

---
### 1.0.3 - 2022-01-09

### Fixed

- Limits - fix limits. if provide before as first or after as last cursor returns an empty data.

---

### 1.0.2 - 2022-01-09

### Fixed

- Types - types is now exported from lib

### Added 

- Example - added example

---

### 1.0.1 - 2022-01-08

### Changed

- Update documentation - readme

---

### 1.0.0 - 2022-01-08

### Added

- Paginator tool - first version
