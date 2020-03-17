import getConfig, { IConfig } from "./get-config"


getConfig()
    .then((config: Readonly<IConfig>) => {

        console.log(Object.keys(config))

    })
    .catch((err: Error) => {

        console.error(err.message)

    })
