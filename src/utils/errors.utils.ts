export function isUserError(error) {
    return error.status && error.data && error.data.errors && error.status === 422
}