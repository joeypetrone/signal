# Signal — Design

## Pitch

**Signal** is a short browser game about a small repair rover named Dot. Scout, an older survey robot, went silent three days ago somewhere in a nearby crater on Mars. Dot drives out to bring her home.

The player drives across one crater, follows Scout's tire tracks, finds her short logs along the way, and solves two small physical puzzles to reach the ridge where she was last seen. There's no combat. It ends with both robots watching a blue Martian sunset, then a mysterious new signal.

The systems at its core: vehicle movement with physics, puzzles driven by a game-state system, a message system, scene transitions with a lighting shift, and input that works on keyboard and gamepad.

## Scene and hook

One location, **a small crater** about four screens wide, seen from above. Rust-red ground, scattered rocks, an old abandoned research station with a gate, and a ridge on the far side. Scout's faint tire tracks wind through it, partly covered by dust.

The hook is the ending. Scout isn't broken. Her battery ran low while she was watching the sunset from the ridge. On Mars, sunsets are blue. Dot shares some power, the whole screen shifts from red day to blue dusk, and the two robots sit together.

The tone is quiet and warm, a little lonely and then hopeful. Nobody is a villain. The only obstacles are terrain and old machinery.

## Characters

| Character | Role | The bit |
| --- | --- | --- |
| Dot (player) | Small repair rover, new to the base | Eager, a bit nervous, beeps when she bumps into things |
| Scout | Older survey robot, the one who's missing | Her logs are curious and gentle. She stopped to look at things nobody asked her to |
| HOME | The base computer, speaks over the radio | Calm and literal. Gives the mission at the start, chimes in a couple of times |

Scout's logs carry the story. Three short logs found along the tracks, each one or two sentences, end with "The sky is doing something wonderful. Going up to the ridge to watch."

## The loop

Drive, follow the tracks, solve two puzzles, reach the ridge. Each puzzle uses the same driving controls.

1. **Roll out.** HOME gives the mission over the radio. Dot leaves the base and finds Scout's tracks. The first log is right there.
2. **The rockslide.** A boulder blocks the narrow path. Drive into it to push it into a gap and make a way through. The second log is past it.
3. **The old station.** The gate to the ridge has no power. Three old mirrors stand nearby. Drive up to each and press Confirm to rotate it until sunlight bounces from mirror to mirror into the station's receiver. The beam lights up as you get it right, and the gate opens. The third log is inside.
4. **The ridge.** Drive up the ridge and find Scout, dark and still, facing the sun. Press Confirm to plug in and share power. Ending plays.

Dot's tire tracks stay on the ground behind her, next to Scout's older tracks. A small dust puff kicks up when she turns or bumps something.

There's no way to fail. Reset puts the current puzzle back.

## Start and end

**Start.** Title screen over a slow pan of the crater, "Press Start," and one line of controls.

**End.** Scout's lights flicker on. "Oh, hello. Did you come all this way for me?" The sun touches the horizon and the screen shifts to blue dusk. The two robots sit side by side for a few seconds of quiet. Then both antennas twitch at a faint ping from somewhere past the crater. HOME says, "That signal isn't one of ours." **To Be Continued.**

**Credits card.** Thanks for playing, Play Again, and a link to the build notes.

## Art and sound

- **Resolution.** 320×180 native, whole-number scaling, `pixelArt: true`. 16×16 tiles.
- **Palette.** 12 to 16 colors. Rust reds and tans for the ground, deep blues for dusk, #0f6e56 as Dot's paint stripe.
- **Rovers.** 8 pre-drawn facing directions rather than a rotated sprite.
- **Dusk shift.** A full-screen tint that tweens from warm to blue, with stars fading in.
- **Message box.** Hand-made frame, typewriter text, a soft blip per letter. Scout and HOME have different blips.
- **Sound.** Motor hum, bump, boulder scrape, mirror click, gate open, power-up. One ambient loop.
- **Mute.** Always on screen, M key too.

## Controls

Input is mapped to **actions, not keys**. Game code asks "is Confirm pressed?" and an input module maps keyboard, gamepad, and touch onto those actions.

Driving is direct: push a direction and Dot turns toward it and drives.

| Action | Keyboard | Gamepad |
| --- | --- | --- |
| Move | Arrows or WASD | Left stick or D-pad |
| Confirm (interact, advance text) | Z, Space, or Enter | A |
| Reset puzzle | R | Y |
| Mute | M | — |

On touch devices, a gameplay clip with "Best played with a keyboard or controller." Stretch: drag to steer, tap to confirm.

## Scope cuts, in order

1. Touch controls (keep the clip fallback)
2. Ending music
3. Stars in the dusk shift
4. Dust puffs
5. One of the three mirrors
6. 8-direction rover art (drop to 4)
7. Title screen pan (still image)

**Never cut** the dusk shift, the ending, message box polish, Reset, mute, or the build notes.

## Stretch goals

Built only once the game plays start to finish. Each one sits on top of finished art and can be skipped without breaking anything.

- **Vignette.** Darkened screen edges that pull the eye to the center.
- **Drifting dust.** Slow, sideways-drifting specks across the crater, thicker near the ridge.
- **Headlight glow.** A soft light cone in front of Dot, and a glow where the mirror beam hits.
- **Parallax ridge.** A distant ridge and sky that scroll slower than the ground.
- **A third puzzle.** A small cave where Dot's headlight only lights a circle around her.
