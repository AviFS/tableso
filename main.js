// async function run() {

//     function output(n) { document.getElementById('out').innerHTML = n[0] }

//     var code = document.getElementById('inp').value;
//     var python = getPythonCode(code);
//     console.log(python);
//     TIO.run(python, '', 'python3').then(n=>output(n[0]));
// }

function run() {
    stack = []
    document.getElementById('out').innerHTML = '';
    inp = document.getElementById('inp').value;
    var [output, s] = interp(inp);
    document.getElementById('out').innerHTML = s;
}