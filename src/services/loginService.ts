import axios from "axios"

const login = async (email: string, password: string) => {
    const res = await axios.post('https://dummyjson.com/auth/login',
        {
            username: email,
            password: password
        })
    return res.data
}

export default { login }