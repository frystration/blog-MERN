export const getUnique = (options) => {
    return options.reduce(
        (res, cur) =>
            res.find((find) => JSON.stringify(find) === JSON.stringify(cur))
                ? res
                : [...res, cur],
        []
    )
};