


const trace = label => value => {
   console.log(`${label} --> ${typeof value === 'object' ? JSON.stringify(value) : value}\r\n`);
   return value;
};

const stub = (name) => `<h1>Rest-Rant</h1><h2>${name}</h2>`;

module.exports = {
   trace,
   stub
}