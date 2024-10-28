const formatting = require('./formatting')
const commonTools = require('./commonTools')

module.exports = function useUtils() {
    return {
        ...formatting,
        ...commonTools,
    }
}
