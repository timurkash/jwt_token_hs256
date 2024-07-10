export const replaceSpecialChars = b64string => b64string.replace(/[=+/]/g, charToBeReplaced => {
    switch (charToBeReplaced) {
        case '=':
            return ''
        case '+':
            return '-'
        case '/':
            return '_'
    }
})

