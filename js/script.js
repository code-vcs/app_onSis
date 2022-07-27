const { ipcRenderer } = require("electron")

// let urlTxt = document.getElementById('ur').value;
let formatTxt = document.getElementById("formato").value;

let db = JSON.parse(localStorage.getItem('dataDbHistory'));
window.onload = () => {
    db.forEach((el,id)=>{
        let a = document.createElement('a');
        a.setAttribute('id',`item-${id}`);
        a.setAttribute('href',el[id]);
        a.innerHTML=el+`<br><hr>`;
        document.querySelector('.historico-video').append(a)
    })
}

document.querySelector("#btDownload").addEventListener("click", () => {
    ipcRenderer.send('solicitarVd', 'vd')
})

ipcRenderer.on('vdSolicited', (evt, arg) => {
    if (arg == 'true') {
        var dataObjectUrl = [
            { url: document.getElementById('ur').value, format: formatTxt },
        ];
        if (document.getElementById('ur').value.startsWith('https://')) {
            ipcRenderer.send('chaveUploadVideo', dataObjectUrl);
            var dataDbHistory = JSON.parse(localStorage.getItem('dataDbHistory'));
            if (dataDbHistory == null) {
                localStorage.setItem('dataDbHistory', JSON.stringify([]))
                var dataDbHistory = JSON.parse(localStorage.getItem('dataDbHistory'));
                dataDbHistory.push(document.getElementById('ur').value)
                localStorage.setItem('dataDbHistory', JSON.stringify(dataDbHistory))
            } else {
                var dataDbHistory = JSON.parse(localStorage.getItem('dataDbHistory'));
                dataDbHistory.push(document.getElementById('ur').value)
                localStorage.setItem('dataDbHistory', JSON.stringify(dataDbHistory))
            }
        } else {
            ipcRenderer.send('erro', 'erro')
        }
    }
})

ipcRenderer.on('saveDataBase',(evt,arg)=>{
    if(arg == 'banco'){
        let db = JSON.parse(localStorage.getItem('dataDbHistory'));
        db.forEach((el,id)=>{
            let a = document.createElement('a');
            a.setAttribute('id',`item-${id}`);
            a.setAttribute('href',el[id]);
            a.download;
            a.innerText=el+`<br><hr>`;
            document.querySelector('.historico-video').append(a)
        })
    }
})




