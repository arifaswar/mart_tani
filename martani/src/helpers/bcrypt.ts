import bcrypt from "bcryptjs"

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10)
}

export const comparePassword = async (password:string, db_password:string) => {
    // console.log("Password dari frontend:", password);
    // console.log("Password di DB:", db_password);
    return await bcrypt.compare(password, db_password)
}