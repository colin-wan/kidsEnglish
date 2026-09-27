#!/bin/bash
# Generate high quality American English voice clips using macOS Samantha (en_US)
# Converted to AAC (.m4a) for native iOS 12 Safari hardware acceleration

VOICE="Samantha"
RATE=170
DEST="audio"

mkdir -p "$DEST"

generate() {
  local id="$1"
  local text="$2"
  local aiff="$DEST/$id.aiff"
  local m4a="$DEST/$id.m4a"
  
  echo "Generating $id: '$text'"
  say -v "$VOICE" -r "$RATE" "$text" -o "$aiff"
  afconvert -f m4af -d aac "$aiff" "$m4a"
  rm -f "$aiff"
}

# Animals full phrases
generate "lion_phrase" "Lion! L is for Lion. Roar!"
generate "elephant_phrase" "Elephant! E is for Elephant. Pawoo!"
generate "monkey_phrase" "Monkey! M is for Monkey. Ooh ooh aah aah!"
generate "duck_phrase" "Duck! D is for Duck. Quack quack quack!"
generate "frog_phrase" "Frog! F is for Frog. Ribbit ribbit!"
generate "bear_phrase" "Bear! B is for Bear. Big warm hug!"

# Animal single words
generate "word_lion" "Lion"
generate "word_elephant" "Elephant"
generate "word_monkey" "Monkey"
generate "word_duck" "Duck"
generate "word_frog" "Frog"
generate "word_bear" "Bear"

# Phonics sounds
generate "phonics_l" "L says l, l, Lion"
generate "phonics_e" "E says eh, eh, Elephant"
generate "phonics_m" "M says mm, mm, Monkey"
generate "phonics_d" "D says duh, duh, Duck"
generate "phonics_f" "F says fff, fff, Frog"
generate "phonics_b" "B says buh, buh, Bear"

# Environment
generate "sun" "Sunny day! Good morning, sun!"
generate "cloud" "Puffy cloud! Raindrops falling down!"
generate "flower" "Pretty flower! Bloom bloom bloom!"
generate "rainbow" "Look! A beautiful rainbow!"
generate "butterfly" "Butterfly! Flutter flutter by!"

# Interactive Game Prompts (Find the animal)
generate "find_lion" "Can you find the lion?"
generate "find_elephant" "Where is the elephant?"
generate "find_monkey" "Can you find the monkey?"
generate "find_duck" "Where is the duck?"
generate "find_frog" "Can you find the frog?"
generate "find_bear" "Where is the bear?"

# Praises & Encouragements
generate "praise_great" "Great job! You found it!"
generate "praise_yay" "Yay! Awesome work!"
generate "praise_super" "You are a superstar!"
generate "praise_highfive" "High five! Woohoo!"

# Game titles & hints
generate "welcome" "Welcome to Animal Safari! Let's explore!"
generate "mode_explore" "Tap the animals to play!"
generate "mode_find" "Listen and find the animal!"
generate "mode_bubbles" "Pop the bubbles! Pop pop pop!"

echo "Audio generation complete!"
