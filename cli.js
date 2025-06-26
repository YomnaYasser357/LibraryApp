// cli.js
const readline = require("readline");
const axios = require("axios");
const qs = require("qs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const serverURL = "http://localhost:8080";

function prompt(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  while (true) {
    console.log("\n--- CLI Menu ---");
    console.log("1. Add Reader");
    console.log("2. Remove Reader");
    console.log("3. Search Reader");
    console.log("4. Get All Readers");
    console.log("5. Add Book");
    console.log("6. Search Book");
    console.log("7. Get All Books");
    console.log("8. Exit");

    const choice = await prompt("Choose an option: ");

    switch (choice.trim()) {
      case "1": await addReader(); break;
      case "2": await removeReader(); break;
      case "3": await searchReader(); break;
      case "4": await getAllReaders(); break;
      case "5": await addBook(); break;
      case "6": await searchBook(); break;
      case "7": await getAllBooks(); break;  
      case "8": console.log("Exiting..."); rl.close(); return;
      default: console.log("Invalid option");
    }
  }
}

async function addReader() {
  const data = {
    id: await prompt("Enter ID: "),
    name: await prompt("Enter Name: "),
    gender: await prompt("Enter Gender: "),
    birthDay: await prompt("Enter BirthDay: "),
    height: await prompt("Enter Height: "),
    weight: await prompt("Enter Weight: "),
    employment: await prompt("Enter Employment: ")
  };

  try {
    const res = await axios.post(`${serverURL}/addReader`, qs.stringify(data), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    console.log(res.data);
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
}

async function removeReader() {
  const id = await prompt("Enter ID to remove: ");
  try {
    const res = await axios.post(`${serverURL}/removeReader`, qs.stringify({ id }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    console.log(res.data);
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
}

async function searchReader() {
  const search = await prompt("Enter Name or ID to search: ");
  try {
    const res = await axios.get(`${serverURL}/searchReader?search=${encodeURIComponent(search)}`);
    console.log(res.data);
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
}

async function getAllReaders() {
  try {
    const res = await axios.get(`${serverURL}/getReadersInfo`);
    console.log(res.data);
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
}

async function addBook() 
  const data = {
    id: await prompt("Enter ID: "),
    name: await prompt("Enter Name: "),
    title: await prompt("Enter Title: "),
    publicDate: await prompt("Enter Public Date: "),
    author: await prompt("Enter Author: "),
    genre: await prompt("Enter Genre: "),
    publisher: await prompt("Enter Publisher: "),
    language: await prompt("Enter Language: ")
  };

  try {
    const res = await axios.post(`${serverURL}/addBook`, qs.stringify(data), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    console.log(res.data);
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
}

async function searchBook() {
  const search = await prompt("Enter Name or ID to search for book: ");
  try {
    const res = await axios.get(`${serverURL}/searchBook?search=${encodeURIComponent(search)}`);
    console.log(res.data);
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
}
async function getAllBooks() {
  try {
    const res = await axios.get(`${serverURL}/getBooksInfo`);
    console.log(res.data);
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
}

main();

