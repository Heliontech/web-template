## Introduction

Pino is a high performance JSON logger for Node.js. It is designed to be fast and lightweight, with a focus on performance and scalability.

## Features

- High performance logging
- JSON format
- Easy to use API
- Supports multiple log levels
- Supports logging to multiple destinations
- Supports logging to file or stdout

## Installation

```bash
npm install pino pino-pretty pino-http
```

- pino is core log library
- pino-pretty is a pretty printer for pino logs. It is for development.
- pino-http is a middleware for logging http requests

## Usage

```typescript
import { logger } from "@pt/logger";

logger.info("Hello world");
logger.error("Something went wrong");
logger.warn("This is a warning");
logger.debug("This is a debug message");
```

## Reference

- log to sentry
- log to elasticsearch
- log to file system
