# Twitch Chat to Telegram Channel (TC2TC)

> Twitch Chat logger in Telegram Channel


[![Build Status](https://travis-ci.org/CitRUSprod/tc2tc.svg?branch=master)](https://travis-ci.org/CitRUSprod/tc2tc) [![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

## Installation with Docker

1. Install <a href="https://docs.docker.com/" target="_blank">docker and docker-compose</a>

2. Clone the repository to your local computer:

```bash
$ git clone https://github.com/CitRUSprod/tc2tc
```

3. Open app folder:

```bash
$ cd tc2tc
```

4. Build an image of the app:

```bash
$ docker-compose build app
```

5. Create [a configuration file](#configuration)

---

## Usage with Docker

Start app:

```bash
$ docker-compose up app
```

Stop app:

```bash
$ docker-compose down
```

---

## Installation without Docker

1. Install <a href="https://nodejs.org/" target="_blank">node.js</a> and <a href="https://classic.yarnpkg.com/" target="_blank">yarn</a>

2. Clone the repository to your local computer:

```bash
$ git clone https://github.com/CitRUSprod/tc2tc
```

3. Open app folder:

```bash
$ cd tc2tc
```

4. Build the app:

```bash
$ yarn && yarn build
```

5. Create [a configuration file](#configuration)

---

## Usage without Docker

Start app:

```bash
$ yarn start
```

---

## Configuration

```js
// data/config.json
{
    "channelPairs": [
        {
            "twitch": "TWITCH_CHANNEL_1",
            "telegram": "TELEGRAM_CHANNEL_1"
        },
        {
            "twitch": "TWITCH_CHANNEL_2",
            "telegram": "TELEGRAM_CHANNEL_2"
        },
        {
            "twitch": "TWITCH_CHANNEL_3",
            "telegram": "TELEGRAM_CHANNEL_3"
        }
    ],
    "telegramBotTokens": [                     // recommended 5-6 bots
        "TELEGRAM_BOT_TOKEN_1",
        "TELEGRAM_BOT_TOKEN_2",
        "TELEGRAM_BOT_TOKEN_3",
        "TELEGRAM_BOT_TOKEN_4",
        "TELEGRAM_BOT_TOKEN_5"
    ],
    "httpsProxy": "0.0.0.0:8080",              // optional
    "format": {                                // optional
        "date": "DD.MM.YYYY",
        "time": "HH:mm:ss"
    }
}
```
