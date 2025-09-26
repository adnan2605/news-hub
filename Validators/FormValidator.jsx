import passwordValidator from "password-validator"



var schema = new passwordValidator();

// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase(1)                              // Must have 1 uppercase letter
.has().lowercase(1)                              // Must have 1 lowercase letter
.has().digits(1)                                // Must have at least 1 digit
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123','Admin@123', 'Password@123']); // Blacklist these values

export default function FormValidator(e) {
    let { name, value } = e.target

    switch (name) {
        case 'name':
        case 'username':
        case 'color':
            if (value && value.length === 0) {
                return name + " Field is Mendatory"
            }
            else if (value.length < 3 || value.length > 50) {
                return name + " Length must be 3 to 50 Character"
            }
            else
                return ''

                case 'subject':
                    if (value && value.length === 0) {
                        return name + " Field is Mendatory"
                    }
                    else if (value.length < 10) {
                        return name + " Length must have 10 Character"
                    }
                    else
                        return ''

        case 'email':
            if (value && value.length === 0) {
                return name + " Field is Mendatory"
            }
            else if (value.length < 13 || value.length > 100) {
                return name + " Length must be 13 to 100 Character"
            }
            else
                return ''

        case 'passworld':
            if (value && value.length === 0) {
                return name + " Field is Mendatory"
            }
            else if (!schema.validate(value)) {
                return name + "Invalid Password it must contain atleast 1 uppercase alphabet , 1 lowercase alphabet, digit , space or any special character"
            }
            else
                return ''


        case 'phone':
            if (value && value.length === 0) {
                return name + " Field is Mendatory"
            }
            else if (value.length < 10 || value.length > 10) {
                return name + " number must be in 10 digits"
            }
            else if (value.startsWith('9') || value.startsWith('8') || value.startsWith('7') || value.startsWith('6'))
                return ""
            else
                return 'Invalid Phone Number'


        case 'size':
            if (value && value.length === 0) {
                return name + " Field is Mendatory"
            }
            else if (value.length > 10) {
                return name + " Length must upto 10 Character"
            }
            else
                return ''


        case 'basePrice':
            if (value && value.length === 0) {
                return name + " Field is Mendatory"
            }
            else if (value.length < 1) {
                return name + " Base Price must be a Positive Value"
            }
            else
                return ''
        case 'discount':
            if (value && value.length === 0) {
                return name + " Field is Mendatory"
            }
            else if (value.length < 0 || value > 99) {
                return name + " Discount must be 0-99%"
            }
            else
                return ''
        case 'stockQuantity':
            if (value && value.length === 0) {
                return name + " Field is Mendatory"
            }
            else if (value.length < 0 || value > 99) {
                return name + " Stock Quantity Must be a Positive Value or 0"
            }
            else
                return ''


        case 'message':
            if (value && value.length === 0) {
                return name + " Field is Mendatory"
            }
            else if (value.length < 50) {
                return name + " Length must be 50 Character or More"
            }
            else
                return ''
        default:
            return ''
    }

}
