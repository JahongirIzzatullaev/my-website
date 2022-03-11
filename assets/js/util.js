function sendMessage(subject, name, email, text, modal, formBtn, close) {
    formBtn.disabled = true;
    let targetDiv = document.getElementById("contact-form-send").getElementsByClassName("response")[0];
    if (name === '' || email === '') {
        targetDiv.innerHTML = "<div class=\"failed\">Please fill the required fields.</div>";
        formBtn.disabled = false;
        return false;
    } else {
        targetDiv.innerHTML = "";
        let url = "https://api.telegram.org/" +
            "bot5206905105:AAEHESRceQ0p2smelffXwz5kLCcibyB23Ro" +
            "/sendMessage?chat_id=@jahongir_mme&text=";

        let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let time = new Date().toLocaleString();
        let language = Intl.DateTimeFormat().resolvedOptions().locale;

        let message = '' +
            '💼 Subject: ' + subject + '%0A' +
            '👔️ Name: ' + name + '%0A' +
            '📩 Email: ' + email + '%0A' +
            '🗺 TimeZone: ' + timezone + '%0A' +
            '🕐 Time: ' + time + '%0A' +
            '🎓 Language: ' + language + '%0A' +
            '💬️ Message: ' + text
        url += message;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url);

        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    toggleModal(modal, formBtn, close, 'Спасибо! Ваше сообщение успешно отправлено!');
                    clearMessage();
                    formBtn.disabled = false;
                } else {
                    toggleModal(modal, formBtn, close, `<div style="color:#dd4142 ">Ошибка! Ваше сообщение не отправлено!</div>`);
                    formBtn.disabled = false;
                }
            }
        };

        xhr.send();
    }
}

function toggleModal(modal, formBtn, close, content) {
    document.getElementById('modal-content').innerHTML = content;
    modal.style.display = "block";

    close.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function clearMessage() {
    document.getElementById('subjectForm').value = '';
    document.getElementById('inputName').value = '';
    document.getElementById('inputEmail').value = '';
    document.getElementById('inputText').value = '';
}
