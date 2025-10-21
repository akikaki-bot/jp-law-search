


export type APIResponse<T> = T | Error

export interface Error {
    code : number
    message : string
}

export function isError<T extends object>( response: APIResponse<T> ): response is Error {
    return "code" in response && "message" in response
}