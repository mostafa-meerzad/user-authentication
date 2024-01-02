const bcrypt = require("bcrypt");

// to hash a password we need a salt
//
// when we hash a password 1234 => abcd this "abcd" is oneway we can't reverse this process and get "1234"
// from "abcd" this is great but if a hacker looks at our database they can't get the actual passwords but
// they can make a list of popular passwords and compile them and eventually they know which password is used 
// to address this we need something called "salt" which is a random string attached before/after the password so the result of hashing will be different each time.

async function run(password){
const salt = await bcrypt.genSalt()
const hash = await bcrypt.hash(password ,salt)
console.log(salt)
console.log(hash)
}

run("1234")
