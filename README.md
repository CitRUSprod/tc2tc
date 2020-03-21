# Twitch Chat to Telegram Channel (TC2TC)

> Twitch Chat logger in Telegram Channel


[![Build Status](https://travis-ci.org/CitRUSprod/tc2tc.svg)](https://travis-ci.org/CitRUSprod/tc2tc) [![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

## Installation:

To get started locally, follow these instructions:

1. Install [docker and docker-compose](https://docs.docker.com/)

2. Clone to your local computer:

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

---

## Usage

Start app:

```bash
$ docker-compose up app
```

Stop app:

```bash
$ docker-compose down
```

---

## Configuration

```json
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
