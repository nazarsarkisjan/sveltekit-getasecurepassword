import { CreateStore } from "./LocalStorageWrapper"

export const store_letters = CreateStore("PasswordGenerator.Modifiers.Letters", true)
export const store_numbers = CreateStore("PasswordGenerator.Modifiers.Numbers", false)
export const store_symbols = CreateStore("PasswordGenerator.Modifiers.Symbols", false)
export const store_length = CreateStore("PasswordGenerator.Modifiers.Length", 6)

export default { store_letters, store_numbers, store_symbols, store_length };



// import { browser } from '$app/environment';
// import { writable } from 'svelte/store';
 
// const defaultValue = 'summer';
// const initialValue = browser ? window.localStorage.getItem('theme') ?? defaultValue : defaultValue;
 
// const theme = writable<string>(initialValue);

// theme.subscribe((value) => {
//   if (browser) {
//     window.localStorage.setItem('theme', value);
//   }
// });
 
// export default theme;