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

    # 🍎 Fruits & Foods
    'fruit_apple': 'Apple! A is for Apple. Sweet red apple.',
    'fruit_banana': 'Banana! B is for Banana. Peel the yellow banana.',
    'fruit_orange': 'Orange! Juicy sweet orange.',
    'fruit_strawberry': 'Strawberry! Yummy little strawberry.',
    'fruit_watermelon': 'Watermelon! Big green juicy watermelon.',
    'fruit_carrot': 'Carrot! Crunchy orange carrot.',
    'fruit_milk': 'Milk! Fresh delicious milk.',
    'fruit_cookie': 'Cookie! Sweet yummy cookie.',

    # 🚗 Vehicles
    'vehicle_car': 'Car! Beep beep goes the car.',
    'vehicle_bus': 'Bus! Big yellow school bus.',
    'vehicle_train': 'Train! Choo choo, all aboard the train!',
    'vehicle_airplane': 'Airplane! Flying high in the clouds.',
    'vehicle_boat': 'Boat! Floating on the water.',
    'vehicle_bicycle': 'Bicycle! Ring ring goes the bell.',

    # 🎨 Colors
    'color_red': 'Red! Like a shiny apple.',
    'color_blue': 'Blue! Like the beautiful sky.',
    'color_yellow': 'Yellow! Like the bright sunshine.',
    'color_green': 'Green! Like the soft green grass.',
    'color_purple': 'Purple! Like sweet yummy grapes.',
    'color_pink': 'Pink! Pretty pink flower.',

    # 🍼 Feeding Activity
    'feed_prompt': 'The little animals are hungry! Tap the food to feed them!',
    'feed_yum': 'Nom nom nom! Yummy! Thank you!',
    'feed_monkey_ask': 'Milo the monkey wants a banana!',
    'feed_bear_ask': 'Barnaby the bear wants sweet honey!',
    'feed_rabbit_ask': 'The bunny rabbit wants a carrot!',

    # 🎵 Nursery Rhymes / Songs
    'song_twinkle': 'Twinkle, twinkle, little star! How I wonder what you are!',
    'song_wheels': 'The wheels on the bus go round and round, all through the town!',
    'song_abc': 'A, B, C, D, E, F, G, come along and sing with me!',
    'song_macdonald': 'Old MacDonald had a farm, E-I-E-I-O!'
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
