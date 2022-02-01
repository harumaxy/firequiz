#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Who wants to be a JavaScript Millionaire? \n"
  );

  await sleep();
  rainbowTitle.stop();
  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")}
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed("Killed")}.

  `);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });
  playerName = answers.player_name;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question1",
    type: "list",
    message: "Javascript was create in 10 days then released on\n",
    choices: [
      "May 23rd, 1995",
      "Nov 24th, 1995",
      "Dec 4th, 1995",
      "Dec 17, 1996",
    ],
  });
  return answers.question1 === "Dec 4th, 1995";
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();
  if (isCorrect) {
    spinner.success({
      text: `Nice work ${playerName}. That's a legit answer.`,
    });
  } else {
    spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}! 💀💀💀` });
    process.exit(1);
  }
}

function winner() {
  console.clear();
  const msg = `Congrats , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0 `;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

await welcome();
await askName();
await handleAnswer(await question1());
await winner();
