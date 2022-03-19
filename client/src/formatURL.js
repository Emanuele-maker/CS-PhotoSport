const formatURL = (url = "") => {
    return url.toLowerCase().replaceAll(" ", "-")
}

export default formatURL