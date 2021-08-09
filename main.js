function run() {
    document.getElementById('out').innerHTML = '';
    inp = document.getElementById('inp').innerText;
    var [output, s] = interp(inp);
    document.getElementById('out').innerHTML = output;
}
