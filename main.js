function run() {
    document.getElementById('out').innerHTML = '';
    inp = document.getElementById('inp').value;
    var [output, s] = interp(inp);
    document.getElementById('out').innerHTML = output;
}