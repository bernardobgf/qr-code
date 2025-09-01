import inquirer from "inquirer"
import image from "qr-image"
import fs from "fs"

inquirer
  .prompt([{
    message: "Type in your URL: ", 
    name: "URL"
  }])
  .then((answers) => {
    //armazena a resposta dentro de uma constante url
    const url = answers.URL

    //geracao do qr code
    var qr = image.image(url)
    qr.pipe(fs.createWriteStream("qr_image.png"))

    //escrevendo um txt com as respostas obtidas. "relatorio"
    //ir adicionando no mesmo arquivo .appendFile
    //sobrescrever arquivo .writeFile
    fs.appendFile("url.txt", url + "\n", (err) => {
      if(err) throw err
      console.log("the file has been saved")
    })
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });