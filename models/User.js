const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Definierar schemat för användare
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /@hamburgare\.se$/.test(v);
            },
            message: props => `${props.value} Är inte giltigt! Ange en e-postadress med ändelsen @hamburgare.se`
        }
    },
    password: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Hashar lösenordet innan det sparas
userSchema.pre("save", async function(next) {
    try {
        if(this.isNew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }

        next();
    } catch(error) {
        next(error);
    }
});

// Statisk metod för att registrera en ny användare
userSchema.statics.register = async function (username, password) {
    try {
        const user = new this({ username, email, password});
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};

// Metod för att jämföra lösenord
userSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);

    }   catch (error) {
        throw error;
    }
}

// Statisk metod för att logga in en användare
userSchema.statics.login = async function (username, password) {
    try {
        const user = await this.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            throw new Error("Incorrect username or password.");
        }
        return user;
    } catch (error) {
        throw error;
    }
}

// Skapar och exporterar användarmodellen
const User = mongoose.model("user", userSchema);
module.exports = User;