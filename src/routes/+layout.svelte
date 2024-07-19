<script>
    import { onMount } from 'svelte';
    import "../app.scss";

    let finalPassword = "";
    let passwordLength = 12;

    const modifiers = {
        letters: {
            "alias": "Letters",
            "values": "abcdefghijklmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUWVXYZ".split(""),
            "enabled": true,
        },
        numbers: {
            "alias": "Numbers",
            "values": "1234567890".split(""),
            "enabled": true,
        },
        symbols: {
            "alias": "Symbols",
            "values": `!@#$%^&*();:'"\|.,`.split(""),
            "enabled": false,
        }
    }

    onMount(async () => {
        generatePassword();

        setTimeout(() => {
            copyPassword();
        }, 10);
    });

    function generatePassword() {
        finalPassword = "";
        
        function getRandomToken() {
            let choices = Object.entries(modifiers)
            let randomToken = "";
            let collection = [];
            
            choices.forEach(e => {
                if (e[1].enabled) {
                    e[1].values.forEach(e => {
                        collection = collection.concat(e);
                    });
                }
            });

            let random = Math.floor(Math.random() * collection.length);
            randomToken = collection[random];

            return randomToken;
        }

        for (let index = 0; index < passwordLength; index++) {
            finalPassword = `${finalPassword}${getRandomToken()}`;
        }
    }

    function copyPassword() {
        var copyText = document.getElementById("password");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
    }

</script>

<div class="main">
    <button on:click={() => copyPassword()}>
        <input type="text" value={finalPassword} readonly id="password">
    </button>

    <button on:click={() => generatePassword()}>generate</button>

    <input type="number" min="6" bind:value={passwordLength}>
</div>

<slot></slot>

<style lang="scss">
    .main {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        input {
            text-align: center; 
        }
    }
</style>