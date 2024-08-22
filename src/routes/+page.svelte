<script>
    import { store_letters, store_numbers, store_symbols, store_length } from '$lib/stores.js';
    import { Toaster, toast } from 'svelte-sonner';
    import { onMount } from 'svelte';
    import { assets } from '$lib';

    import "../app.scss";

    let finalPassword = "";

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

        if ($store_length < 6 || $store_length > 999) {
            return toast('❌ Character limit is between 6 and 999 characters');
        }

        finalPassword = "";

        modifiers.letters.enabled = $store_letters;
        modifiers.numbers.enabled = $store_numbers;
        modifiers.symbols.enabled = $store_symbols;

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

        for (let index = 0; index < $store_length; index++) {
            finalPassword = `${finalPassword}${getRandomToken()}`;
        }

        toast('✅ Password is in your clipboard!');
    }

    function copyPassword() {
        var copyText = document.getElementById("password");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
    }
</script>

<div class="main">
    <Toaster />
    <div class="main__restrict">
        <button class="main__password" on:click={() => copyPassword() }>
            <div class="password__preview">
                <nobr>{finalPassword}</nobr>
            </div>
            <img src={assets.copy} alt="Copy">
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
            <div class="charachter__input">
                <input class="characters" type="number" min="6" max="999" bind:value={$store_length}>
            </div>
        </div>
    </div>
</div>


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

            flex-wrap: wrap;

            border-radius: 5px;

            .main__password {
                width: 100%;
                max-height: 40px;
                text-align: center;
                color: white;
                background-color: rgb(24, 24, 24);
                border: 1px solid #555555;
                border-radius: 5px;
                padding: 10px;

                -webkit-user-select: text;
                -moz-user-select: text;
                -ms-user-select: text;
                user-select: text;

                display: flex;
                justify-content: space-between;
                gap: 10px;
               
                cursor: pointer;

                transition: all 50ms;

                &:active {
                    background-color: rgba($color: white, $alpha: 0.12);
                    transform: scale(0.99);
                }

                img {
                    height: 18px;
                    width: 18px;
                }

                input {
                    display: none;
                }

                .password__preview {
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
    
            .main__generate {
                color: white;
                text-transform: capitalize;
                background-color: rgb(32, 32, 32);

                padding: 10px 15px;
                border-radius: 5px;
                border: none;

                cursor: pointer;

                transition: all 50ms;

                &:active {
                    background-color: rgba($color: rgb(85, 85, 85), $alpha: 0.5);
                    transform: scale(0.99);
                }
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

                .charachter__input {
                    .characters {
                        max-width: 70px;
                        width: 100%;
                        height: 25px;
                        padding: 6px;
                        border-radius: 5px;
                        
                        display: flex;
                        justify-content: center;
                        box-sizing: border-box;
                        background-color: rgb(32, 32, 32);
                        color: white;
                        border: none;
                    }
                }
            }
        }
    }
</style>