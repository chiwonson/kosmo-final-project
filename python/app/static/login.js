document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const mid = document.getElementById('mid').value;
    const mpw = document.getElementById('mpw').value;

    try {
        const response = await fetch('http://localhost:8083/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mid, mpw }),
        });

        const result = await response.text();

        if (response.ok) {
            window.location.href = '/welcome'; // 성공 시 리디렉션
        } else {
            document.getElementById('error').textContent = result;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error').textContent = 'An error occurred';
    }
});
