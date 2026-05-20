const moongoose = require("mongoose")

const blacklistTokenSchema = new moongoose.Schema({ 
    token : {
        type : String,
        required : [true,"Token is required to be added in the blacklist"]
    }
},{
    timestamps : true
})

const BlacklistTokenModel = moongoose.model("BlacklistToken", blacklistTokenSchema)

module.exports = BlacklistTokenModel