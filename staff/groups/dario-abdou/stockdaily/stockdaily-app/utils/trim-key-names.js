function trimKeyNames(element) {
    if(element instanceof Array) {
        element.forEach(element => {
            for(key in element) {
                let newKey = key.split(' ')[1]
                element[newKey] = element[key]
                delete element[key]
            }
        });
    return element
    } else if(element instanceof Object) {
        for(key in element) {
            let newKey = key.split(' ')[1]
            element[newKey] = element[key]
            delete element[key]
        }
    }
}