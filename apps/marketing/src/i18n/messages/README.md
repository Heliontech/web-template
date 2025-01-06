## Introduction

You could define your own messages in this directory.

## Usage

### 1. Add a new language

Create a new file in this directory, e.g. `en.json` for English.

### 2. Add a new message

Add a new key-value pair to the JSON file. The key is the message identifier and the value is the message text.

```json
{
  "message.hello": "Hello, world!"
}
```

### 3. Use the message in your code

Use the `useTranslation` hook to get the translation function and then use it to translate the message.

```javascript
import { useTranslations } from "next-intl";

function MyComponent() {
  const { t } = useTranslation();

  return <div>{t("message.hello")}</div>;
}
```
