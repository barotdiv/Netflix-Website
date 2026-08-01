import mongosse from "mongoose"

const userSchema = mongosse.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})

const User = mongosse.models.User || mongosse.model("User", userSchema)

export default User