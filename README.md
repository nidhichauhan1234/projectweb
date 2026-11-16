# Aryan Bluebird Chronicles

Build a romantic, aesthetic, matte-finish interactive birthday website for my boyfriend Aryan turning 20.

Theme & Aesthetic (Matte & Cozy — NO Glitter/Neon):

Color palette: Soft matte aesthetic shades of powder blue, dusty denim blue, deep slate blue, warm cream/beige (#F7F3EB), and crisp off-white (#FDFBF7).

Texture & Vibe: Clean matte paper cards, soft organic shadows, rounded edges, cozy editorial typography—strictly no glitter, no harsh neon, and no dark/black backgrounds.

Step-by-Step Navigation (Back & Forward Controls): Structure the experience as smooth, full-screen interactive chapters with clear "← Back" and "Next →" buttons (plus a subtle progress indicator at the top) so he can revisit any previous moment or move forward anytime.

Centralized 12-Photo & Text Config (config.js): Put ALL text, shayari, letter paragraphs, and a clean list of 12 local photo paths (/photos/photo1.jpg through /photos/photo12.jpg) inside a single config.js file at the top of the project so I can easily drop my 12 images into public/photos/ and rearrange which photo goes where later. Ensure all images use object-cover with graceful fallback frames. Also place the attached couple photos into public/photos/ and wire them into the config.

Cute Custom Illustrated Couple Characters (Consistent Aesthetic Blue Outfits):

Create two adorable, aesthetic flat/vector cartoon characters throughout the site in coordinated blue & beige outfits:

The Girl Character: Beautiful girl with warm expressive eyes, cute hairstyle, wearing an aesthetic pastel blue & beige outfit, acting as his personal guide with cute speech bubbles.

The Boy Character (Aryan): Handsome boy with a charming smile, styled hair, wearing a matching slate-blue/white outfit.

Animate their poses/expressions cleanly using SVG/Framer Motion for each chapter:

Step-by-Step Interactive Chapters (All with Back & Next Navigation):

Chapter 1 — Hero / Opening Screen:

Matte cream/beige & soft sky-blue background with gently floating matte-framed background photos (using 2–3 photos from the 12-photo config).

The cute illustrated Girl character stands waving happily with a speech bubble saying: "Happy Birthday Aryan! 💙 Ready for your surprise?"

Big matte typography headline: "He Turned 20! Happy Birthday to My Man 💙" with a "Start the Celebration →" button.

Chapter 2 — Interactive Cake Cutting & Feeding Celebration:

Subtle polaroid background photos (from the 12-photo config) placed neatly on the corners of the stage.

Centerpiece: An aesthetic matte blue, beige, and white 2-tier birthday cake with glowing "20" candles, with both illustrated characters (Girl and Aryan) standing together beside the cake.

Step A: Button "Make a wish & blow the candles" — when clicked, candles blow out with soft smoke puffs while the Girl character claps happily.

Step B: Button "Cut the cake together!" — when clicked, both characters hold the cake knife together to cut a slice, party poppers burst with matte blue, beige & white confetti, and then the animation transitions to both of them feeding a piece of cake to each other with blushing happy expressions!

Chapter 3 — Polaroid Memories Gallery:

The Girl character appears at the top with a speech bubble: "Look at all my favourite versions of you..."

An aesthetic matte beige & blue polaroid gallery displaying featured photos from the 12-photo config where clicking any photo zooms in smoothly.

Attach editable caption slots on the polaroids pre-filled with these lines (easy to reassign to whichever photo I want in config.js):

"Mera sohna munda 💙 un katilana nighaon se mt baat kiya karo jinhe dekh sab tham sa jaye..."

"Chashma utarte hi bilkul alag face card lagta hai—isliye kehti hu nashedi chashma pehn le 😎✨"

"Your smile—which seems rare to see, is so special that I always check all your photos just to see kisme hans raha hai 🥰"

"Aapke lips jinhe niharti rehti hu... ❤️"

Chapter 4 — Guided Gift Unboxing ("Now I have something for you... 🎁"):

Show the Girl character holding Aryan's hand / guiding him through 5 interactive gift boxes one by one (with speech bubbles like "Let's open Gift #1!", "Ooh look at this next one..." as he moves through each gift):

Gift 1 (Personal Love Letter): Opens a scrollable matte cream paper letter with a photo pinned at the top and this text (plus clear markers to add more paragraphs):
"Happy 20th Birthday, My Man 💙
Roz kehti rehti hu saath nahi rehna, lekin thoda sa bhi mere saath badal jao toh mere aansu ka tumhare liye yun behna... kyunki jaanti hu ladke bohot mil jayenge, but tumhare jaisa shayad hi koi mile. Because it's not about you or me—it's about US baby, which completes both of us.
[ADD MORE LETTER PARAGRAPHS HERE]"

Gift 2 (Interactive Scratch Card): A realistic matte dusty-blue & cream scratch-off voucher where he drags his finger/mouse to scratch away the coating and reveal:
"Voucher Unlocked: I will be saying YES to you for 24 hours! 🎟️💙"

Gift 3 (Interactive Craft Handmade Greeting Card with Waterfall Photo Pull-Tab):

Build a realistic, multi-layered craft handmade card in matte beige & pastel blue cardstock with stitched border details, tiny paper hearts, and interactive craft mechanics:

Left Side — Interactive Waterfall Photo Slider: A real craft-style pull-tab waterfall photo stack holding 3–4 photos from the config! When he clicks/drags the "Pull Tab ↓" ribbon, the layered photos cascade/flip down one after another like a real DIY waterfall scrapbook card.

Right Side — Openable Mini Envelope / Flap with Shayari: Clicking the wax-sealed flap unfolds the inner note displaying this exact shayari in an aesthetic handwritten font:
"Jab tumse pehli baar yun mili,
Kuch nayi si umeed khuli,
Shaam tha suhana aur tumhare saath muskurana,
Tumhara mujhe samajhna aur nazrein chhupakar dekhna,
Ghar pahunchkar sochu toh har pal sapna sa lagna—
Yeh kya jaadu us pehli mulaqat ne kar diya.

Karu main us chaand ki baat jisne laayi mere chehre pe muskurahat,
Khada tha woh JLN Gate ke paas, kar raha tha mera intezaar,
Jab use dekha tab sab tham sa gaya—
Koi kisi se itna pyaar kaise kar sakta hai, yeh uske saath rehkar pata chala.
Uska woh sharmana, mera haath pakad ke chalna, dil mein jagah sa banata gaya,
Tha thoda dar ghabrahat pehli dafa milne ka, but usne chutkiyon mein maano nikal diya,
Har pal notification awaaz sunkar jo sukoon mila, kab woh meri aadat ban gaya 💙"

Gift 4 (The "Double" Card): A playful matte blue & white popup card featuring a mini photo frame and the message:
"Teko har cheez do baar chahiye hoti hai na? Le, Happy Birthday once again! 🎉🎂"
Followed by a customizable wish box ([Add your second birthday wish / inside joke here]).

Gift 5 (The Real-Life Surprise): The Girl character points excitedly beside a mystery gift box that shakes on click and opens to say:
"Look around you / Look there 👀🎁"

Chapter 5 — Closing / Outro Section:

Both illustrated characters (Girl and Aryan) standing together smiling in matching blue tones, surrounded by a floating collage of the 12 photos around the matte cream & blue background, with the final message:
"I hope accha laga ho ❤️ I love you! Ab party dene ke liye ready ho jao, kal milte hain! 🥂✨"

Include a "← Replay from Start" button at the bottom.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://aryan-bluebird-chronicles.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c5a14843-4e79-4c71-bd89-2a3f641ce49e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
