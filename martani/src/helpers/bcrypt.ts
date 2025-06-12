import bcrypt from "bcryptjs"

export const hashPassword = (password: string) => {
    return bcrypt.hashSync(password, 10)
}
export const comparePassword = async (password:string, db_password:string) => {
    return  bcrypt.compareSync(password, db_password)
}