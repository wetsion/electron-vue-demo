const MDPATH = 'md=path'

export function saveMdFilePath(path) {
    localStorage.setItem(MDPATH, path)
}

export function getMdFilePath() {
    localStorage.getItem(MDPATH)
}