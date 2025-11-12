// Contoh request yang benar dari frontend
fetch('/api/profile/ubahpassword', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        currentpassword: 'password_lama',
        newpassword: 'password_baru',
        confirmpassword: 'password_baru'
    })
})