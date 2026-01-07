

function generatePassword(length=8) {
    const chars = "ABCDEFGHIJKlmnopqrstuvwxyz#@";
    let pass ="";
    for(let i=0;i<length;i++){
        pass+= chars[Math.floor(Math.random()*chars.length)];
    }
    
  return pass;
}

module.exports= generatePassword;