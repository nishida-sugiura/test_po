


// LIFF初期化
liff.init({
    liffId: '2001059289-X2m74PYZ', // 自分のLIFFアプリのIDに置き換える
})
.then(() => {
    // LIFFが初期化された後にログイン状態を確認
    if (liff.isLoggedIn()) {
        onLogin(); // ログイン済みの場合、ログイン後の処理を実行
    } else {
        // 未ログインの場合、自動的にログイン
        liff.login();
    }
})
.catch((error) => {
    console.error('LIFF initialization failed', error);
});



async function onLogin() {
    try {
        const profile = await liff.getProfile();
        const idToken = liff.getIDToken();
        
        // ここでIDトークンを使ってGASにデータを送信する処理を行う
        sendDataToGAS(idToken);
    } catch (error) {
        console.error(error);
    }
}


function sendDataToGAS(idToken) {
    // ここでidTokenを含めたデータをGASに送信する処理を実装
    const gasEndpoint = "https://script.google.com/macros/s/AKfycbyJOCOorABSkk3GG1CB_ttmAV8Uxwnai9hhLW1F51vr-85kZbYq__cUtdonOZiRUsbyxA/exec";
    fetch(gasEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
    })
    .then(response => response.json())
    .then(data => console.log("Response from GAS:", data))
    .catch(error => console.error("Error sending data to GAS:", error));
}










