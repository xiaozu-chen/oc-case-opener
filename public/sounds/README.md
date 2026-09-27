# Sound effects go here

The app expects exactly three files in this folder:

| File name          | Used for                                             |
|---------------------|-------------------------------------------------------|
| `frame-pass.mp3`    | Plays once per item as the reel scrolls past it       |
| `selected.mp3`      | Plays the instant the reel stops on the winning item  |
| `unboxing.mp3`      | Plays when the "Open Case" button is pressed          |

Drop your own clips in with those exact names (any browser-supported audio
format works — `.mp3`, `.wav`, `.ogg` — just update the extension in
`src/hooks/useSound.ts` if you use something other than `.mp3`).

If a file is missing, the app won't crash — it just plays silently — so you
can build and test the UI before the audio is in place.
