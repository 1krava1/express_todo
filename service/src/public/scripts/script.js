function handleSubmits(){
    document.querySelectorAll('form').forEach((form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const inputs = form.querySelectorAll('input');
            const data = {};
            inputs.forEach((input) => {
                if (input.getAttribute('type') === 'checkbox') {
                    data[input.getAttribute('name')] = input.checked;
                } else {
                    data[input.getAttribute('name')] = input.value;
                }
            });
            const url = form.getAttribute('action');
            var xhr = new XMLHttpRequest();
            xhr.open(form.getAttribute('method'), url, true);
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
            console.log(form.getAttribute('method'), form.getAttribute('action'), data);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    const response = JSON.parse( xhr.response );
                    window.location.reload();
                }
            }
        })
    })
}
handleSubmits();