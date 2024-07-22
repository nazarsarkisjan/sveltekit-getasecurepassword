<script>
    import { store_letters, store_numbers, store_symbols, store_length } from '$lib/stores.js';
    import { onMount } from 'svelte';
    import "../app.scss";

    let finalPassword = "";
    // let passwordLength = $store_length;

    const modifiers = {
        letters: {
            "alias": "Letters",
            "values": "abcdefghijklmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUWVXYZ".split(""),
            "enabled": $store_letters,
        },
        numbers: {
            "alias": "Numbers",
            "values": "1234567890".split(""),
            "enabled": $store_numbers,
        },
        symbols: {
            "alias": "Symbols",
            "values": `!@#$%^&*();:'"\|.,`.split(""),
            "enabled": $store_symbols,
        }
    }

    onMount(async () => {
        generatePassword();

        setTimeout(() => {
            copyPassword();
        }, 5);
    });

    function generatePassword() {
        finalPassword = "";
        
        function getRandomToken() {
            let choices = Object.entries(modifiers)
            let randomToken = "";
            let collection = [];
            
            choices.forEach(e => {
                console.log(e);
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

        for (let index = 0; index < $store_length; index++) {
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
    <div class="main__restrict">
        <button class="main__password" on:click={() => copyPassword() }>
            {finalPassword}
            <input type="text" value={finalPassword} readonly id="password">
        </button>
    
        <button class="main__generate" on:click={() => { generatePassword(); setTimeout(() => { copyPassword() }, 5); }}>Generate</button>
    
        <div class="main__characters">
            <div>
                <input type="checkbox" name="numbers" id="numbers" bind:checked={$store_numbers}>
                <label for="numbers">numbers</label>
            </div>
            <div>
                <input type="checkbox" name="symbols" id="symbols" bind:checked={$store_symbols}>
                <label for="symbols">symbols</label>
            </div>
            <input class="characters" type="number" min="6" bind:value={$store_length}>
        </div>
    </div>
</div>

<slot></slot>

<style lang="scss">
    .main {
        width: 100%;
        height: 90vh;
        display: flex;
        justify-content: center;
        align-items: center;

        .main__restrict {
            width: 100%;
            max-width: 300px;
            padding: 10px;

            display: flex;
            flex-direction: column;
            gap: 5px;

            border-radius: 5px;

            .main__password {
                text-align: center;
                color: white;
                background-color: rgb(49, 47, 47);
                border-radius: 5px;
                padding: 10px 15px;
                border: none;

                -webkit-user-select: text;
                -moz-user-select: text;
                -ms-user-select: text;
                user-select: text;

                text-overflow: ellipsis;
                overflow: hidden;
                
                input {
                    display: none;
                }
            }
    
            .main__generate {
                color: white;
                text-transform: capitalize;
                background-color: rgb(85, 85, 85);

                padding: 10px 15px;
                border-radius: 5px;
                border: none;

                cursor: pointer;
            }
    
            .main__characters {
                display: flex;
                justify-content: space-between;

                div {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 2px;

                    text-transform: capitalize;

                    label {
                        color: white;
                    }
                }

                .characters {
                    width: 50px;
                    padding: 8px;

                    background-color: rgb(49, 47, 47);
                    color: white;

                    border-radius: 5px;
                    border: none;
                }
            }
        }
    }
</style>