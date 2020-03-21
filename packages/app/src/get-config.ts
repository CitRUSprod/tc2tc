import path from "path"
import fs from "fs-extra"
import Schema from "validate"


export interface IChannelPair {
    twitch: string
    telegram: string
}


export interface IConfig {
    channelPairs: Array<IChannelPair>
    telegramBotTokens: Array<string>
    httpsProxy?: string
    format?: {
        date?: string
        time?: string
    }
}


const channelPairSchema: Schema = new Schema({
    twitch: {
        type: String,
        required: true
    },
    telegram: {
        type: String,
        required: true
    }
})


const configSchema: Schema = new Schema({
    channelPairs: {
        type: Array,
        each: channelPairSchema,
        length: { min: 1 },
        required: true
    },
    telegramBotTokens: {
        type: Array,
        each: {
            type: String,
            required: true
        },
        length: { min: 1 },
        required: true
    },
    httpsProxy: { type: String },
    format: {
        date: { type: String },
        time: { type: String }
    }
})


/**
 * Gets config from data/config.json.
 *
 * @example
 * ```javascript
 * const config = await getConfig()
 * ```
 */
export default async function getConfig(): Promise<IConfig> {

    let config: IConfig = {} as IConfig

    try {

        config = await fs.readJson(path.join(process.cwd(), "data/config.json"))

    } catch {}

    const errors: Array<Error> = configSchema.validate(config) as any as Array<Error>

    if (errors.length > 0) {

        throw new Error(`Config Error: ${errors[0].message}`)

    }

    return config

}
