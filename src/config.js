
const defaultConfig = Object.freeze( {
    colors: [
        '#333333' ,
        'rgb(235, 93, 11)' ,
        '#666666' ,
    ]
} )

export default defaultConfig

function noV( params ) {
    return params === undefined || params === null
}

export function fixConfig( config ) {
    if ( noV( config ) ) {
        return defaultConfig
    }
    if ( noV( config.colors ) ) {
        Object.assign( config , { colors: defaultConfig.colors } )
    }
    return config
}