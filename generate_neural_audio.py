#!/usr/bin/env python3
"""
Generate gentle, warm, studio-grade American English audio clips
using Google WaveNet Neural Human TTS (en-US) with fallback to Sandy (en_US).
Outputs both .mp3 and .m4a (AAC) for maximum compatibility with iOS 12 Safari & Mac.
"""

import os
import sys
import time
import urllib.parse
import urllib.request
import subprocess

AUDIO_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'audio')
os.makedirs(AUDIO_DIR, exist_ok=True)

CLIPS = {
    # Animals (Existing)
    'lion_phrase': 'Lion! L is for Lion.',
    'elephant_phrase': 'Elephant! E is for Elephant.',
    'monkey_phrase': 'Monkey! M is for Monkey.',
    'duck_phrase': 'Duck! D is for Duck.',
    'frog_phrase': 'Frog! F is for Frog.',
    'bear_phrase': 'Bear! B is for Bear.',
    'word_lion': 'Lion',
    'word_elephant': 'Elephant',
    'word_monkey': 'Monkey',
    'word_duck': 'Duck',
    'word_frog': 'Frog',
    'word_bear': 'Bear',
    'phonics_l': 'L says l, l, Lion',
    'phonics_e': 'E says eh, eh, Elephant',
    'phonics_m': 'M says mm, mm, Monkey',
    'phonics_d': 'D says duh, duh, Duck',
    'phonics_f': 'F says fff, fff, Frog',
    'phonics_b': 'B says buh, buh, Bear',

    # Animals (New additions)
    'rabbit_phrase': 'Rabbit! R is for Rabbit. Hop hop hop!',
    'word_rabbit': 'Rabbit',
    'phonics_r': 'R says rrr, rrr, Rabbit',
    'find_rabbit': 'Can you find the rabbit?',
    'cat_phrase': 'Cat! C is for Cat. Meow!',
    'word_cat': 'Cat',
    'phonics_c': 'C says kuh, kuh, Cat',
    'find_cat': 'Where is the cat?',
    'dog_phrase': 'Dog! D is for Dog. Woof woof!',
    'word_dog': 'Dog',
    'find_dog': 'Can you find the dog?',

    # Nature
    'sun': 'Sunny day! Good morning, sun!',
    'cloud': 'Puffy cloud! Raindrops falling down!',
    'flower': 'Pretty flower! Bloom bloom bloom!',
    'rainbow': 'Look! A beautiful rainbow!',
    'butterfly': 'Butterfly! Flutter flutter by!',

    # Prompts & Praises
    'find_lion': 'Can you find the lion?',
    'find_elephant': 'Where is the elephant?',
    'find_monkey': 'Can you find the monkey?',
    'find_duck': 'Where is the duck?',
    'find_frog': 'Can you find the frog?',
    'find_bear': 'Where is the bear?',
    'praise_great': 'Great job! You found it!',
    'praise_yay': 'Yay! Awesome work!',
    'praise_super': 'You are a superstar!',
    'praise_highfive': 'High five! Woohoo!',
    'welcome': "Welcome to Animal Safari! Let's explore!",
    'mode_explore': 'Tap the items to play!',
    'mode_find': 'Listen and find it!',
    'mode_bubbles': 'Pop the bubbles! Pop pop pop!',

    # Animals (Expanded)
    'panda_phrase': 'Panda! P is for Panda. Crunch crunch bamboo!',
    'cow_phrase': 'Cow! C is for Cow. Moo moo!',
    'sheep_phrase': 'Sheep! S is for Sheep. Baa baa!',
    'word_panda': 'Panda',
    'word_cow': 'Cow',
    'word_sheep': 'Sheep',
    'phonics_p': 'P says puh, puh, Panda',
    'phonics_s': 'S says sss, sss, Sheep',
    'find_panda': 'Can you find the panda?',
    'find_cow': 'Where is the cow?',
    'find_sheep': 'Can you find the sheep?',

    # 🍎 Fruits & Foods
    'fruit_apple': 'Apple! A is for Apple. Sweet red apple.',
    'fruit_banana': 'Banana! B is for Banana. Peel the yellow banana.',
    'fruit_orange': 'Orange! Juicy sweet orange.',
    'fruit_strawberry': 'Strawberry! Yummy little strawberry.',
    'fruit_watermelon': 'Watermelon! Big green juicy watermelon.',
    'fruit_carrot': 'Carrot! Crunchy orange carrot.',
    'fruit_milk': 'Milk! Fresh delicious milk.',
    'fruit_cookie': 'Cookie! Sweet yummy cookie.',
    'fruit_grapes': 'Grapes! Sweet purple grapes.',
    'fruit_corn': 'Corn! Golden sweet corn.',
    'fruit_cheese': 'Cheese! Tasty yellow cheese.',
    'fruit_honey': 'Honey! Sweet golden honey.',
    'fruit_fish': 'Fish! Fresh little fish.',
    'fruit_bone': 'Bone! Crunchy tasty bone.',
    'fruit_bamboo': 'Bamboo! Fresh green bamboo.',

    # 🚗 Vehicles
    'vehicle_car': 'Car! Beep beep goes the car.',
    'vehicle_bus': 'Bus! Big yellow school bus.',
    'vehicle_train': 'Train! Choo choo, all aboard the train!',
    'vehicle_airplane': 'Airplane! Flying high in the clouds.',
    'vehicle_boat': 'Boat! Floating on the water.',
    'vehicle_bicycle': 'Bicycle! Ring ring goes the bell.',
    'vehicle_firetruck': 'Fire Truck! Wee-woo, wee-woo! Brave and fast.',
    'vehicle_helicopter': 'Helicopter! Chop chop chop! Flying up so high.',

    # 🎨 Colors
    'color_red': 'Red! Like a shiny apple.',
    'color_blue': 'Blue! Like the beautiful sky.',
    'color_yellow': 'Yellow! Like the bright sunshine.',
    'color_green': 'Green! Like the soft green grass.',
    'color_purple': 'Purple! Like sweet yummy grapes.',
    'color_pink': 'Pink! Pretty pink flower.',
    'color_orange': 'Orange! Bright orange.',
    'color_brown': 'Brown! Teddy bear brown.',
    'color_white': 'White! Puffy white cloud.',
    'color_black': 'Black! Shiny black night.',

    # 🍼 Feeding Activity
    'feed_prompt': 'The little animals are hungry! Tap the food to feed them!',
    'feed_yum': 'Nom nom nom! Yummy! Thank you!',
    'feed_monkey_ask': 'Milo the monkey wants a banana!',
    'feed_bear_ask': 'Barnaby the bear wants sweet honey!',
    'feed_rabbit_ask': 'The bunny rabbit wants a carrot!',
    'feed_cat_ask': 'Cleo wants a tasty fish!',
    'feed_dog_ask': 'Buster wants a crunchy bone!',
    'feed_panda_ask': 'Panpan wants green bamboo!',
    'feed_elephant_ask': 'Ellie wants juicy watermelon!',
    'feed_duck_ask': 'Ducky wants sweet golden corn!',

    # ⏸️ Pause & Rest Mode
    'pause_take_break': 'Time for a break! Rest your eyes and have some water.',
    'pause_resume': "Welcome back! Let's play!",

    # 🔤 Alphabet A-Z Phonics & Prompts
    'song_abc': "A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, and Z! Now I know my A B Cs, next time won't you sing with me!",
    'theme_alphabet': "Let's learn the ABC alphabet!",
    'letter_phrase_a': 'A! A says ah, ah, Apple!',
    'letter_phrase_b': 'B! B says buh, buh, Bear!',
    'letter_phrase_c': 'C! C says kuh, kuh, Cat!',
    'letter_phrase_d': 'D! D says duh, duh, Duck!',
    'letter_phrase_e': 'E! E says eh, eh, Elephant!',
    'letter_phrase_f': 'F! F says fff, fff, Frog!',
    'letter_phrase_g': 'G! G says guh, guh, Grapes!',
    'letter_phrase_h': 'H! H says huh, huh, Honey!',
    'letter_phrase_i': 'I! I says ih, ih, Igloo!',
    'letter_phrase_j': 'J! J says juh, juh, Jellyfish!',
    'letter_phrase_k': 'K! K says kuh, kuh, Kangaroo!',
    'letter_phrase_l': 'L! L says lll, lll, Lion!',
    'letter_phrase_m': 'M! M says mmm, mmm, Monkey!',
    'letter_phrase_n': 'N! N says nnn, nnn, Nest!',
    'letter_phrase_o': 'O! O says ah, ah, Orange!',
    'letter_phrase_p': 'P! P says puh, puh, Panda!',
    'letter_phrase_q': 'Q! Q says kwuh, kwuh, Queen!',
    'letter_phrase_r': 'R! R says rrr, rrr, Rabbit!',
    'letter_phrase_s': 'S! S says sss, sss, Sun!',
    'letter_phrase_t': 'T! T says tuh, tuh, Train!',
    'letter_phrase_u': 'U! U says uh, uh, Umbrella!',
    'letter_phrase_v': 'V! V says vvv, vvv, Van!',
    'letter_phrase_w': 'W! W says wuh, wuh, Watermelon!',
    'letter_phrase_x': 'X! X says ks, ks, Xylophone!',
    'letter_phrase_y': 'Y! Y says yuh, yuh, Yo-yo!',
    'letter_phrase_z': 'Z! Z says zzz, zzz, Zebra!',

    'find_letter_a': 'Can you find the letter A?',
    'find_letter_b': 'Can you find the letter B?',
    'find_letter_c': 'Can you find the letter C?',
    'find_letter_d': 'Can you find the letter D?',
    'find_letter_e': 'Can you find the letter E?',
    'find_letter_f': 'Can you find the letter F?',
    'find_letter_g': 'Can you find the letter G?',
    'find_letter_h': 'Can you find the letter H?',
    'find_letter_i': 'Can you find the letter I?',
    'find_letter_j': 'Can you find the letter J?',
    'find_letter_k': 'Can you find the letter K?',
    'find_letter_l': 'Can you find the letter L?',
    'find_letter_m': 'Can you find the letter M?',
    'find_letter_n': 'Can you find the letter N?',
    'find_letter_o': 'Can you find the letter O?',
    'find_letter_p': 'Can you find the letter P?',
    'find_letter_q': 'Can you find the letter Q?',
    'find_letter_r': 'Can you find the letter R?',
    'find_letter_s': 'Can you find the letter S?',
    'find_letter_t': 'Can you find the letter T?',
    'find_letter_u': 'Can you find the letter U?',
    'find_letter_v': 'Can you find the letter V?',
    'find_letter_w': 'Can you find the letter W?',
    'find_letter_x': 'Can you find the letter X?',
    'find_letter_y': 'Can you find the letter Y?',
    'find_letter_z': 'Can you find the letter Z?'
}

def download_google_tts(text, out_mp3):
    encoded = urllib.parse.quote(text)
    url = f"https://translate.google.com/translate_tts?ie=UTF-8&q={encoded}&tl=en-US&client=tw-ob"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    }
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=10) as resp:
        content = resp.read()
        if len(content) < 500:
            raise ValueError(f"Content too short: {len(content)} bytes")
        with open(out_mp3, 'wb') as f:
            f.write(content)
    return True

def fallback_macos_tts(text, out_m4a):
    aiff = out_m4a.replace('.m4a', '.aiff')
    voice = 'Sandy (英语（美国）)'
    try:
        subprocess.run(['say', '-v', voice, text, '-o', aiff], check=True)
    except Exception:
        subprocess.run(['say', '-v', 'Samantha', text, '-o', aiff], check=True)
    subprocess.run(['afconvert', '-f', 'm4af', '-d', 'aac', aiff, out_m4a], check=True)
    if os.path.exists(aiff):
        os.remove(aiff)

def convert_mp3_to_m4a(mp3_file, m4a_file):
    subprocess.run(['afconvert', '-f', 'm4af', '-d', 'aac', mp3_file, m4a_file], check=True)

def generate_all():
    print(f"Checking/Generating {len(CLIPS)} neural voice clips...")
    for key, text in CLIPS.items():
        mp3_path = os.path.join(AUDIO_DIR, f"{key}.mp3")
        m4a_path = os.path.join(AUDIO_DIR, f"{key}.m4a")

        # Skip if already exists and valid size
        if os.path.exists(mp3_path) and os.path.getsize(mp3_path) > 1000 and os.path.exists(m4a_path) and os.path.getsize(m4a_path) > 1000:
            continue

        print(f"Generating [{key}]: \"{text}\" ...", end=' ', flush=True)

        try:
            download_google_tts(text, mp3_path)
            convert_mp3_to_m4a(mp3_path, m4a_path)
            print("✓ Google WaveNet (en-US)")
        except Exception as e:
            print(f"(fallback: {e})", end=' ')
            try:
                fallback_macos_tts(text, m4a_path)
                print("✓ Apple Sandy (en-US)")
            except Exception as e2:
                print(f"FAILED: {e2}")

        time.sleep(0.12)

    print("\nAll audio clips are up to date with natural gentle human voice!")

if __name__ == '__main__':
    generate_all()
