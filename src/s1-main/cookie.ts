import { Response } from "express";

export const cookieSettings = {}
//export const cookieSettings = DEV_VERSION ? {} : {sameSite: "none" as const, secure: true};
export const resAddCookie = (res: Response) => {
    const expiresIn = new Date(2022, 1, 1)
    return res.cookie("unauthId", res.locals.unauthId, {
        ...cookieSettings,
        expires: expiresIn,
    });
}
export const resClearCookie = (res: Response, key: string) => {
    return res.clearCookie(key);
}