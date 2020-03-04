const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const employees = [];
let nextMember = true;
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

console.log("Please build your team.");

const managerQs = [{
    type: "input",
    message: "What is your manager's name?",
    name: "mangName"
  },
  {
    type: "input",
    message: "What is your manager's ID?",
    name: "mangId"
  },
  {
    type: "input",
    message: "What is your manager's email?",
    name: "mangEmail"
  },
  {
    type: "input",
    message: "What is your manager's office number?",
    name: "mangOffNum"
  }
];
const engineerQs = [{
    type: "input",
    message: "What is your engineer's name?",
    name: "engName"
  },
  {
    type: "input",
    message: "What is your engineer's ID?",
    name: "engId"
  },
  {
    type: "input",
    message: "What is your engineer's email?",
    name: "engEmail"
  },
  {
    type: "input",
    message: "What is your engineer's GitHub username?",
    name: "engGitHub"
  },
];
const internQs = [{
    type: "input",
    message: "What is your intern's name?",
    name: "intName"
  },
  {
    type: "input",
    message: "What is your intern's ID?",
    name: "intId"
  },
  {
    type: "input",
    message: "What is your intern's email?",
    name: "intEmail"
  },
  {
    type: "input",
    message: "What is your intern's school?",
    name: "intSchool"
  },
];
const memberQ = {
  type: "list",
  message: "What type of team member would you like to add?",
  name: "teamMember",
  choices: ["Engineer", "Intern", "I don't want to add any more team members"]
}

const validateQ = {
  type: "validate",
  message: "That ID is already taken. Please choose another.",
  name: "idCheck"
}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
function mgrPrompt() {
  inquirer.prompt(managerQs).then(function (answers) {
    const manager = new Manager(answers.mangName, answers.mangId, answers.mangEmail, answers.MangOffNum);
    employees.push(manager);
    inquirer.prompt(memberQ).then(function (data) {
      if (nextMember) {
        console.log("hi");
        while (memberQ.choices === "Engineer" || memberQ.choices === "Intern") {
          switch (memberQ.choices) {
            case "Engineer":
              inquirer.prompt(engineerQs).then(function (answers) {
                const engineer = new Engineer(answers.engName, answers.engId, answers.engEmail, answers.engGitHub);
                employees.push(engineer);
                idValidator(idCheck);
                return data.engineer;
              });
            case "Intern":
              inquirer.prompt(internQs).then(function (answers) {
                const intern = new Intern(answers.intName, answers.intId, answers.intEmail, answers.intSchool);
                employees.push(intern);
                idValidator();
                return data.intern;
              });
          }
        }
      } else {
        console.log("bye");
        // nextMember = false;
        // fileToHTML();
      }
    });
  });
};
// mgrPrompt();
// const engineer = new Engineer(answers.engName, answers.engID, answers.engEmail, answers.engGitHub);
// employees.push(engineer);
// const intern = new Intern(answers.intName, answers.intID, answers.intEmail, answers.intSchool);
// employees.push(intern);
// console.log(answers);
// render.render(employees);
// fs.writeFileSync(outputPath, render( {...employees} ), "utf-8");
// }).done(function(employees) {
mgrPrompt();

function fileToHTML() {
  fs.writeFileSync(outputPath, render(employees), "utf-8"),
    function (err) {
      if (err) {
        throw err;
      }
    };
};

function idValidator() {
  if (data.memberQ.choices === data.mangId) {
    inquirer.prompt(validateQ);
  }
};
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!