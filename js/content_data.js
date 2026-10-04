/**
 * Expanded Multi-Theme Content Data v3.0 (Test Version)
 * For Toddlers (2-3 yo) & iOS 12.5.8 Safari iPad
 * - 12 Animals (Lion, Elephant, Monkey, Duck, Frog, Bear, Rabbit, Cat, Dog, Panda, Cow, Sheep)
 * - 12 Yummy Foods (Apple, Banana, Orange, Strawberry, Watermelon, Carrot, Milk, Cookie, Grapes, Corn, Cheese, Honey)
 * - 8 Vehicles (Car, Bus, Train, Airplane, Boat, Bicycle, Fire Truck, Helicopter)
 * - 10 Colors (Red, Blue, Yellow, Green, Purple, Pink, Orange, Brown, White, Black)
 * - 6 Classic Nursery Songs
 * - 8 Hungry Animal Friends with dynamic food basket
 */

var ContentData = {
  // 🦁 1. ANIMALS THEME (12 Cute Animals)
  animals: [
    {
      id: 'lion',
      name: 'Lion',
      letter: 'L',
      phonicsKey: 'phonics_l',
      wordKey: 'word_lion',
      phraseKey: 'lion_phrase',
      sfxType: 'lion',
      promptKey: 'find_lion',
      bubbleEmoji: '🦁',
      title: 'Leo the Lion',
      tagline: 'Roar! Roar!',
      color: '#FFB300',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<circle cx="100" cy="105" r="72" fill="#FF8F00"/>' +
            '<circle cx="48" cy="75" r="26" fill="#FFA000"/>' +
            '<circle cx="40" cy="120" r="26" fill="#FFA000"/>' +
            '<circle cx="65" cy="158" r="26" fill="#FFA000"/>' +
            '<circle cx="100" cy="172" r="26" fill="#FFA000"/>' +
            '<circle cx="135" cy="158" r="26" fill="#FFA000"/>' +
            '<circle cx="160" cy="120" r="26" fill="#FFA000"/>' +
            '<circle cx="152" cy="75" r="26" fill="#FFA000"/>' +
            '<circle cx="100" cy="40" r="26" fill="#FFA000"/>' +
            '<circle cx="68" cy="48" r="24" fill="#FFA000"/>' +
            '<circle cx="132" cy="48" r="24" fill="#FFA000"/>' +
            '<circle cx="58" cy="62" r="18" fill="#F57C00"/>' +
            '<circle cx="58" cy="62" r="11" fill="#FFCCBC"/>' +
            '<circle cx="142" cy="62" r="18" fill="#F57C00"/>' +
            '<circle cx="142" cy="62" r="11" fill="#FFCCBC"/>' +
            '<circle cx="100" cy="106" r="52" fill="#FFD54F"/>' +
            '<circle cx="68" cy="116" r="10" fill="#FF8A80" opacity="0.6"/>' +
            '<circle cx="132" cy="116" r="10" fill="#FF8A80" opacity="0.6"/>' +
            '<ellipse cx="76" cy="98" rx="8" ry="11" fill="#263238"/>' +
            '<circle cx="78" cy="94" r="3.5" fill="#FFFFFF"/>' +
            '<ellipse cx="124" cy="98" rx="8" ry="11" fill="#263238"/>' +
            '<circle cx="126" cy="94" r="3.5" fill="#FFFFFF"/>' +
            '<ellipse cx="100" cy="120" rx="20" ry="14" fill="#FFF9C4"/>' +
            '<path d="M 90 114 Q 100 110 110 114 Q 100 126 90 114 Z" fill="#795548"/>' +
            '<path d="M 100 122 L 100 128 M 92 128 Q 100 135 108 128" stroke="#5D4037" stroke-width="2.5" stroke-linecap="round" fill="none"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'elephant',
      name: 'Elephant',
      letter: 'E',
      phonicsKey: 'phonics_e',
      wordKey: 'word_elephant',
      phraseKey: 'elephant_phrase',
      sfxType: 'elephant',
      promptKey: 'find_elephant',
      bubbleEmoji: '🐘',
      title: 'Ellie the Elephant',
      tagline: 'Pawoo! Splash!',
      color: '#42A5F5',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<ellipse cx="46" cy="98" rx="34" ry="44" fill="#90CAF9" transform="rotate(-15 46 98)"/>' +
            '<ellipse cx="48" cy="100" rx="22" ry="30" fill="#F8BBD0" opacity="0.6"/>' +
            '<ellipse cx="154" cy="98" rx="34" ry="44" fill="#90CAF9" transform="rotate(15 154 98)"/>' +
            '<ellipse cx="152" cy="100" rx="22" ry="30" fill="#F8BBD0" opacity="0.6"/>' +
            '<circle cx="100" cy="102" r="50" fill="#64B5F6"/>' +
            '<circle cx="70" cy="114" r="10" fill="#FF8A80" opacity="0.55"/>' +
            '<circle cx="130" cy="114" r="10" fill="#FF8A80" opacity="0.55"/>' +
            '<ellipse cx="78" cy="94" rx="8" ry="11" fill="#263238"/>' +
            '<circle cx="80" cy="90" r="3.5" fill="#FFFFFF"/>' +
            '<ellipse cx="122" cy="94" rx="8" ry="11" fill="#263238"/>' +
            '<circle cx="124" cy="90" r="3.5" fill="#FFFFFF"/>' +
            '<path d="M 94 112 Q 100 135 106 142 Q 116 150 126 138 Q 132 126 122 120" fill="none" stroke="#64B5F6" stroke-width="15" stroke-linecap="round"/>' +
            '<circle cx="128" cy="106" r="5" fill="#80D8FF"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'monkey',
      name: 'Monkey',
      letter: 'M',
      phonicsKey: 'phonics_m',
      wordKey: 'word_monkey',
      phraseKey: 'monkey_phrase',
      sfxType: 'monkey',
      promptKey: 'find_monkey',
      bubbleEmoji: '🐒',
      title: 'Milo the Monkey',
      tagline: 'Ooh ooh aah aah!',
      color: '#8D6E63',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<circle cx="44" cy="95" r="24" fill="#795548"/>' +
            '<circle cx="44" cy="95" r="14" fill="#FFCCBC"/>' +
            '<circle cx="156" cy="95" r="24" fill="#795548"/>' +
            '<circle cx="156" cy="95" r="14" fill="#FFCCBC"/>' +
            '<circle cx="100" cy="102" r="50" fill="#8D6E63"/>' +
            '<path d="M 100 80 C 82 62 62 80 66 102 C 68 122 88 134 100 136 C 112 134 132 122 134 102 C 138 80 118 62 100 80 Z" fill="#FFE0B2"/>' +
            '<circle cx="74" cy="112" r="8" fill="#FF8A80" opacity="0.6"/>' +
            '<circle cx="126" cy="112" r="8" fill="#FF8A80" opacity="0.6"/>' +
            '<ellipse cx="84" cy="92" rx="7" ry="10" fill="#263238"/>' +
            '<circle cx="86" cy="89" r="3" fill="#FFFFFF"/>' +
            '<ellipse cx="116" cy="92" rx="7" ry="10" fill="#263238"/>' +
            '<circle cx="118" cy="89" r="3" fill="#FFFFFF"/>' +
            '<path d="M 88 116 Q 100 128 112 116" stroke="#5D4037" stroke-width="3" stroke-linecap="round" fill="none"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'duck',
      name: 'Duck',
      letter: 'D',
      phonicsKey: 'phonics_d',
      wordKey: 'word_duck',
      phraseKey: 'duck_phrase',
      sfxType: 'duck',
      promptKey: 'find_duck',
      bubbleEmoji: '🦆',
      title: 'Ducky the Duck',
      tagline: 'Quack! Quack!',
      color: '#FFCA28',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<ellipse cx="100" cy="162" rx="65" ry="12" fill="#80D8FF" opacity="0.5"/>' +
            '<ellipse cx="100" cy="115" rx="52" ry="44" fill="#FFEE58"/>' +
            '<circle cx="80" cy="106" r="9" fill="#FF8A80" opacity="0.6"/>' +
            '<ellipse cx="88" cy="94" rx="8" ry="11" fill="#263238"/>' +
            '<circle cx="90" cy="90" r="3.5" fill="#FFFFFF"/>' +
            '<path d="M 112 95 Q 146 95 142 108 Q 130 116 112 112 Z" fill="#FF7043" stroke="#F4511E" stroke-width="1.5"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'frog',
      name: 'Frog',
      letter: 'F',
      phonicsKey: 'phonics_f',
      wordKey: 'word_frog',
      phraseKey: 'frog_phrase',
      sfxType: 'frog',
      promptKey: 'find_frog',
      bubbleEmoji: '🐸',
      title: 'Freddy the Frog',
      tagline: 'Ribbit! Ribbit!',
      color: '#66BB6A',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<ellipse cx="100" cy="160" rx="78" ry="18" fill="#388E3C" opacity="0.75"/>' +
            '<circle cx="68" cy="74" r="22" fill="#66BB6A"/>' +
            '<circle cx="132" cy="74" r="22" fill="#66BB6A"/>' +
            '<ellipse cx="100" cy="115" rx="60" ry="46" fill="#81C784"/>' +
            '<ellipse cx="100" cy="126" rx="36" ry="26" fill="#DCEDC8"/>' +
            '<ellipse cx="68" cy="74" rx="8" ry="10" fill="#263238"/>' +
            '<circle cx="71" cy="70" r="3" fill="#FFFFFF"/>' +
            '<ellipse cx="132" cy="74" rx="8" ry="10" fill="#263238"/>' +
            '<circle cx="135" cy="70" r="3" fill="#FFFFFF"/>' +
            '<circle cx="58" cy="118" r="9" fill="#FF8A80" opacity="0.6"/>' +
            '<circle cx="142" cy="118" r="9" fill="#FF8A80" opacity="0.6"/>' +
            '<path d="M 64 116 Q 100 142 136 116" stroke="#2E7D32" stroke-width="3.5" stroke-linecap="round" fill="none"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'bear',
      name: 'Bear',
      letter: 'B',
      phonicsKey: 'phonics_b',
      wordKey: 'word_bear',
      phraseKey: 'bear_phrase',
      sfxType: 'bear',
      promptKey: 'find_bear',
      bubbleEmoji: '🐻',
      title: 'Barnaby the Bear',
      tagline: 'Warm Big Hug!',
      color: '#A1887F',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<circle cx="54" cy="62" r="20" fill="#8D6E63"/>' +
            '<circle cx="54" cy="62" r="11" fill="#FFCCBC"/>' +
            '<circle cx="146" cy="62" r="20" fill="#8D6E63"/>' +
            '<circle cx="146" cy="62" r="11" fill="#FFCCBC"/>' +
            '<circle cx="100" cy="106" r="54" fill="#A1887F"/>' +
            '<circle cx="68" cy="118" r="10" fill="#FF8A80" opacity="0.6"/>' +
            '<circle cx="132" cy="118" r="10" fill="#FF8A80" opacity="0.6"/>' +
            '<ellipse cx="78" cy="96" rx="7" ry="10" fill="#263238"/>' +
            '<circle cx="80" cy="92" r="3" fill="#FFFFFF"/>' +
            '<ellipse cx="122" cy="96" rx="7" ry="10" fill="#263238"/>' +
            '<circle cx="124" cy="92" r="3" fill="#FFFFFF"/>' +
            '<ellipse cx="100" cy="122" rx="24" ry="18" fill="#D7CCC8"/>' +
            '<ellipse cx="100" cy="115" rx="10" ry="7" fill="#4E342E"/>' +
            '<path d="M 100 122 L 100 128 M 92 128 Q 100 134 108 128" stroke="#4E342E" stroke-width="2.5" stroke-linecap="round" fill="none"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'rabbit',
      name: 'Rabbit',
      letter: 'R',
      phonicsKey: 'phonics_r',
      wordKey: 'word_rabbit',
      phraseKey: 'rabbit_phrase',
      sfxType: 'boing',
      promptKey: 'find_rabbit',
      bubbleEmoji: '🐰',
      title: 'Bunny the Rabbit',
      tagline: 'Hop! Hop! Hop!',
      color: '#F48FB1',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<ellipse cx="75" cy="55" rx="16" ry="48" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="2"/>' +
            '<ellipse cx="75" cy="55" rx="9" ry="34" fill="#F8BBD0"/>' +
            '<ellipse cx="125" cy="55" rx="16" ry="48" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="2"/>' +
            '<ellipse cx="125" cy="55" rx="9" ry="34" fill="#F8BBD0"/>' +
            '<circle cx="100" cy="120" r="50" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="2"/>' +
            '<circle cx="68" cy="126" r="10" fill="#FF8A80" opacity="0.6"/>' +
            '<circle cx="132" cy="126" r="10" fill="#FF8A80" opacity="0.6"/>' +
            '<ellipse cx="80" cy="110" rx="7" ry="10" fill="#263238"/>' +
            '<circle cx="82" cy="106" r="3" fill="#FFFFFF"/>' +
            '<ellipse cx="120" cy="110" rx="7" ry="10" fill="#263238"/>' +
            '<circle cx="122" cy="106" r="3" fill="#FFFFFF"/>' +
            '<polygon points="95,124 105,124 100,130" fill="#EC407A"/>' +
            '<path d="M 94 133 Q 100 138 106 133" stroke="#5D4037" stroke-width="2.5" stroke-linecap="round" fill="none"/>' +
            '<line x1="50" y1="126" x2="30" y2="122" stroke="#BDBDBD" stroke-width="2"/>' +
            '<line x1="150" y1="126" x2="170" y2="122" stroke="#BDBDBD" stroke-width="2"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'cat',
      name: 'Cat',
      letter: 'C',
      phonicsKey: 'phonics_c',
      wordKey: 'word_cat',
      phraseKey: 'cat_phrase',
      sfxType: 'chime',
      promptKey: 'find_cat',
      bubbleEmoji: '🐱',
      title: 'Kitty the Cat',
      tagline: 'Meow! Purr!',
      color: '#FF7043',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<polygon points="50,90 70,40 90,85" fill="#FF8A65"/>' +
            '<polygon points="58,85 70,52 82,82" fill="#FFCCBC"/>' +
            '<polygon points="150,90 130,40 110,85" fill="#FF8A65"/>' +
            '<polygon points="142,85 130,52 118,82" fill="#FFCCBC"/>' +
            '<circle cx="100" cy="115" r="50" fill="#FF8A65"/>' +
            '<circle cx="68" cy="122" r="9" fill="#FF8A80" opacity="0.6"/>' +
            '<circle cx="132" cy="122" r="9" fill="#FF8A80" opacity="0.6"/>' +
            '<ellipse cx="78" cy="106" rx="8" ry="11" fill="#263238"/>' +
            '<circle cx="80" cy="102" r="3.5" fill="#FFFFFF"/>' +
            '<ellipse cx="122" cy="106" rx="8" ry="11" fill="#263238"/>' +
            '<circle cx="124" cy="102" r="3.5" fill="#FFFFFF"/>' +
            '<polygon points="96,118 104,118 100,123" fill="#D84315"/>' +
            '<path d="M 92 126 Q 100 132 108 126" stroke="#4E342E" stroke-width="2.5" fill="none"/>' +
            '<line x1="52" y1="120" x2="32" y2="116" stroke="#FFF" stroke-width="2"/>' +
            '<line x1="148" y1="120" x2="168" y2="116" stroke="#FFF" stroke-width="2"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'dog',
      name: 'Dog',
      letter: 'D',
      phonicsKey: 'phonics_d',
      wordKey: 'word_dog',
      phraseKey: 'dog_phrase',
      sfxType: 'boing',
      promptKey: 'find_dog',
      bubbleEmoji: '🐶',
      title: 'Buster the Dog',
      tagline: 'Woof! Woof!',
      color: '#FFA726',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<!-- Floppy Ears -->' +
            '<ellipse cx="50" cy="98" rx="18" ry="38" fill="#8D6E63" transform="rotate(-15 50 98)"/>' +
            '<ellipse cx="150" cy="98" rx="18" ry="38" fill="#8D6E63" transform="rotate(15 150 98)"/>' +
            '<!-- Head -->' +
            '<circle cx="100" cy="110" r="50" fill="#FFB74D"/>' +
            '<circle cx="68" cy="118" r="9" fill="#FF8A80" opacity="0.6"/>' +
            '<circle cx="132" cy="118" r="9" fill="#FF8A80" opacity="0.6"/>' +
            '<ellipse cx="78" cy="100" rx="8" ry="11" fill="#263238"/>' +
            '<circle cx="80" cy="96" r="3" fill="#FFF"/>' +
            '<ellipse cx="122" cy="100" rx="8" ry="11" fill="#263238"/>' +
            '<circle cx="124" cy="96" r="3" fill="#FFF"/>' +
            '<ellipse cx="100" cy="120" rx="18" ry="12" fill="#FFE0B2"/>' +
            '<ellipse cx="100" cy="115" rx="8" ry="6" fill="#3E2723"/>' +
            '<path d="M 94 122 Q 100 128 106 122" stroke="#3E2723" stroke-width="2.5" fill="none"/>' +
            '<path d="M 100 126 Q 103 136 100 140 Q 97 136 100 126 Z" fill="#FF5252"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'panda',
      name: 'Panda',
      letter: 'P',
      phonicsKey: 'phonics_p',
      wordKey: 'word_panda',
      phraseKey: 'panda_phrase',
      sfxType: 'chime',
      promptKey: 'find_panda',
      bubbleEmoji: '🐼',
      title: 'Panpan the Panda',
      tagline: 'Munch! Munch!',
      color: '#78909C',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<circle cx="56" cy="68" r="22" fill="#263238"/>' +
            '<circle cx="144" cy="68" r="22" fill="#263238"/>' +
            '<circle cx="100" cy="112" r="52" fill="#FFFFFF" stroke="#CFD8DC" stroke-width="2"/>' +
            '<ellipse cx="76" cy="102" rx="14" ry="18" fill="#263238" transform="rotate(-20 76 102)"/>' +
            '<circle cx="78" cy="98" r="5" fill="#FFFFFF"/>' +
            '<circle cx="79" cy="97" r="2" fill="#263238"/>' +
            '<ellipse cx="124" cy="102" rx="14" ry="18" fill="#263238" transform="rotate(20 124 102)"/>' +
            '<circle cx="122" cy="98" r="5" fill="#FFFFFF"/>' +
            '<circle cx="121" cy="97" r="2" fill="#263238"/>' +
            '<circle cx="68" cy="124" r="9" fill="#FF8A80" opacity="0.6"/>' +
            '<circle cx="132" cy="124" r="9" fill="#FF8A80" opacity="0.6"/>' +
            '<ellipse cx="100" cy="122" rx="9" ry="6" fill="#263238"/>' +
            '<path d="M 94 130 Q 100 135 106 130" stroke="#263238" stroke-width="2.5" fill="none"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'cow',
      name: 'Cow',
      letter: 'C',
      phonicsKey: 'phonics_c',
      wordKey: 'word_cow',
      phraseKey: 'cow_phrase',
      sfxType: 'boing',
      promptKey: 'find_cow',
      bubbleEmoji: '🐮',
      title: 'Daisy the Cow',
      tagline: 'Moo! Moo!',
      color: '#8D6E63',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<ellipse cx="50" cy="62" rx="8" ry="16" fill="#FFB74D" transform="rotate(-30 50 62)"/>' +
            '<ellipse cx="150" cy="62" rx="8" ry="16" fill="#FFB74D" transform="rotate(30 150 62)"/>' +
            '<ellipse cx="44" cy="92" rx="18" ry="10" fill="#FFFFFF" stroke="#E0E0E0" transform="rotate(-20 44 92)"/>' +
            '<ellipse cx="156" cy="92" rx="18" ry="10" fill="#FFFFFF" stroke="#E0E0E0" transform="rotate(20 156 92)"/>' +
            '<circle cx="100" cy="105" r="50" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="2"/>' +
            '<path d="M 80 60 Q 95 80 120 70 Q 130 90 140 85 Q 148 100 135 110 Z" fill="#455A64"/>' +
            '<ellipse cx="78" cy="98" rx="7" ry="10" fill="#263238"/>' +
            '<circle cx="80" cy="94" r="3" fill="#FFF"/>' +
            '<ellipse cx="122" cy="98" rx="7" ry="10" fill="#263238"/>' +
            '<circle cx="124" cy="94" r="3" fill="#FFF"/>' +
            '<ellipse cx="100" cy="126" rx="26" ry="18" fill="#F8BBD0"/>' +
            '<circle cx="90" cy="124" r="4" fill="#880E4F"/>' +
            '<circle cx="110" cy="124" r="4" fill="#880E4F"/>' +
            '<path d="M 94 134 Q 100 138 106 134" stroke="#880E4F" stroke-width="2.5" fill="none"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'sheep',
      name: 'Sheep',
      letter: 'S',
      phonicsKey: 'phonics_s',
      wordKey: 'word_sheep',
      phraseKey: 'sheep_phrase',
      sfxType: 'chime',
      promptKey: 'find_sheep',
      bubbleEmoji: '🐑',
      title: 'Woolly the Sheep',
      tagline: 'Baa! Baa!',
      color: '#90A4AE',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<circle cx="65" cy="75" r="22" fill="#ECEFF1"/>' +
            '<circle cx="135" cy="75" r="22" fill="#ECEFF1"/>' +
            '<circle cx="100" cy="60" r="24" fill="#ECEFF1"/>' +
            '<circle cx="50" cy="115" r="22" fill="#ECEFF1"/>' +
            '<circle cx="150" cy="115" r="22" fill="#ECEFF1"/>' +
            '<circle cx="65" cy="150" r="22" fill="#ECEFF1"/>' +
            '<circle cx="135" cy="150" r="22" fill="#ECEFF1"/>' +
            '<circle cx="100" cy="160" r="22" fill="#ECEFF1"/>' +
            '<ellipse cx="100" cy="112" rx="42" ry="48" fill="#FFCCBC"/>' +
            '<ellipse cx="58" cy="98" rx="8" ry="16" fill="#D7CCC8" transform="rotate(-30 58 98)"/>' +
            '<ellipse cx="142" cy="98" rx="8" ry="16" fill="#D7CCC8" transform="rotate(30 142 98)"/>' +
            '<circle cx="78" cy="120" r="7" fill="#FF8A80" opacity="0.6"/>' +
            '<circle cx="122" cy="120" r="7" fill="#FF8A80" opacity="0.6"/>' +
            '<ellipse cx="84" cy="106" rx="6" ry="9" fill="#263238"/>' +
            '<circle cx="86" cy="102" r="2.5" fill="#FFF"/>' +
            '<ellipse cx="116" cy="106" rx="6" ry="9" fill="#263238"/>' +
            '<circle cx="118" cy="102" r="2.5" fill="#FFF"/>' +
            '<polygon points="96,118 104,118 100,123" fill="#D84315"/>' +
            '<path d="M 94 128 Q 100 134 106 128" stroke="#4E342E" stroke-width="2" fill="none"/>' +
          '</g>' +
        '</svg>'
      )
    }
  ],

  // 🍎 2. FRUITS & FOODS THEME (12 Delicious Foods)
  fruits: [
    {
      id: 'apple',
      name: 'Apple',
      letter: 'A',
      phraseKey: 'fruit_apple',
      bubbleEmoji: '🍎',
      tagline: 'Sweet & Crunchy!',
      color: '#E53935',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<path d="M 100 50 Q 125 30 135 45 Q 125 65 100 50 Z" fill="#4CAF50"/>' +
            '<path d="M 98 52 Q 102 38 104 32" stroke="#5D4037" stroke-width="4" fill="none"/>' +
            '<path d="M 100 68 C 60 55 40 90 45 130 C 50 165 85 175 100 162 C 115 175 150 165 155 130 C 160 90 140 55 100 68 Z" fill="#EF5350"/>' +
            '<circle cx="72" cy="120" r="8" fill="#FF8A80" opacity="0.6"/>' +
            '<circle cx="128" cy="120" r="8" fill="#FF8A80" opacity="0.6"/>' +
            '<ellipse cx="80" cy="108" rx="6" ry="9" fill="#263238"/>' +
            '<circle cx="82" cy="105" r="3" fill="#FFF"/>' +
            '<ellipse cx="120" cy="108" rx="6" ry="9" fill="#263238"/>' +
            '<circle cx="122" cy="105" r="3" fill="#FFF"/>' +
            '<path d="M 90 122 Q 100 132 110 122" stroke="#B71C1C" stroke-width="3" stroke-linecap="round" fill="none"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'banana',
      name: 'Banana',
      letter: 'B',
      phraseKey: 'fruit_banana',
      bubbleEmoji: '🍌',
      tagline: 'Peel & Eat!',
      color: '#FDD835',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<path d="M 60 160 C 45 110 80 50 150 45 C 135 60 120 100 135 140 C 110 165 80 170 60 160 Z" fill="#FFEE58" stroke="#FBC02D" stroke-width="3"/>' +
            '<circle cx="102" cy="108" r="7" fill="#FF8A80" opacity="0.6"/>' +
            '<ellipse cx="98" cy="95" rx="5" ry="8" fill="#263238"/>' +
            '<circle cx="100" cy="92" r="2.5" fill="#FFF"/>' +
            '<path d="M 92 108 Q 98 116 106 108" stroke="#F57F17" stroke-width="2.5" stroke-linecap="round" fill="none"/>' +
            '<polygon points="150,45 156,40 158,46" fill="#689F38"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'orange',
      name: 'Orange',
      letter: 'O',
      phraseKey: 'fruit_orange',
      bubbleEmoji: '🍊',
      tagline: 'Juicy Round!',
      color: '#FF9800',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<path d="M 100 48 Q 120 35 125 45 Q 115 60 100 48 Z" fill="#4CAF50"/>' +
            '<circle cx="100" cy="115" r="60" fill="#FFA726"/>' +
            '<circle cx="68" cy="122" r="9" fill="#FF8A80" opacity="0.6"/>' +
            '<circle cx="132" cy="122" r="9" fill="#FF8A80" opacity="0.6"/>' +
            '<ellipse cx="78" cy="106" rx="7" ry="10" fill="#263238"/>' +
            '<circle cx="80" cy="102" r="3" fill="#FFF"/>' +
            '<ellipse cx="122" cy="106" rx="7" ry="10" fill="#263238"/>' +
            '<circle cx="124" cy="102" r="3" fill="#FFF"/>' +
            '<path d="M 90 122 Q 100 134 110 122" stroke="#E65100" stroke-width="3" stroke-linecap="round" fill="none"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'strawberry',
      name: 'Strawberry',
      letter: 'S',
      phraseKey: 'fruit_strawberry',
      bubbleEmoji: '🍓',
      tagline: 'Yummy Sweet!',
      color: '#E91E63',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<path d="M 75 60 L 100 45 L 125 60 L 115 70 L 100 64 L 85 70 Z" fill="#4CAF50"/>' +
            '<path d="M 100 65 C 65 65 50 110 70 145 C 85 170 100 175 100 175 C 100 175 115 170 130 145 C 150 110 135 65 100 65 Z" fill="#EC407A"/>' +
            '<circle cx="78" cy="115" r="7" fill="#FF8A80" opacity="0.6"/>' +
            '<circle cx="122" cy="115" r="7" fill="#FF8A80" opacity="0.6"/>' +
            '<ellipse cx="86" cy="102" rx="6" ry="8" fill="#263238"/>' +
            '<circle cx="88" cy="99" r="2.5" fill="#FFF"/>' +
            '<ellipse cx="114" cy="102" rx="6" ry="8" fill="#263238"/>' +
            '<circle cx="116" cy="99" r="2.5" fill="#FFF"/>' +
            '<path d="M 94 116 Q 100 124 106 116" stroke="#880E4F" stroke-width="2.5" stroke-linecap="round" fill="none"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'watermelon',
      name: 'Watermelon',
      letter: 'W',
      phraseKey: 'fruit_watermelon',
      bubbleEmoji: '🍉',
      tagline: 'Big & Juicy!',
      color: '#4CAF50',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<path d="M 30 95 C 40 160 160 160 170 95 Z" fill="#388E3C"/>' +
            '<path d="M 38 98 C 46 150 154 150 162 98 Z" fill="#A5D6A7"/>' +
            '<path d="M 45 100 C 52 144 148 144 155 100 Z" fill="#E53935"/>' +
            '<circle cx="78" cy="120" r="7" fill="#FF8A80" opacity="0.6"/>' +
            '<circle cx="122" cy="120" r="7" fill="#FF8A80" opacity="0.6"/>' +
            '<ellipse cx="86" cy="112" rx="5" ry="7" fill="#263238"/>' +
            '<circle cx="88" cy="109" r="2" fill="#FFF"/>' +
            '<ellipse cx="114" cy="112" rx="5" ry="7" fill="#263238"/>' +
            '<circle cx="116" cy="109" r="2" fill="#FFF"/>' +
            '<circle cx="70" cy="110" r="3" fill="#263238"/>' +
            '<circle cx="100" cy="125" r="3" fill="#263238"/>' +
            '<circle cx="130" cy="110" r="3" fill="#263238"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'carrot',
      name: 'Carrot',
      letter: 'C',
      phraseKey: 'fruit_carrot',
      bubbleEmoji: '🥕',
      tagline: 'Crunchy Orange!',
      color: '#FF6D00',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<path d="M 100 55 L 90 35 L 100 45 L 110 35 Z" stroke="#4CAF50" stroke-width="4" stroke-linecap="round" fill="none"/>' +
            '<path d="M 75 60 Q 100 55 125 60 L 100 165 Z" fill="#FF7043" stroke="#F4511E" stroke-width="2"/>' +
            '<ellipse cx="90" cy="90" rx="5" ry="7" fill="#263238"/>' +
            '<circle cx="91" cy="88" r="2" fill="#FFF"/>' +
            '<ellipse cx="110" cy="90" rx="5" ry="7" fill="#263238"/>' +
            '<circle cx="111" cy="88" r="2" fill="#FFF"/>' +
            '<path d="M 95 102 Q 100 108 105 102" stroke="#BF360C" stroke-width="2" fill="none"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'milk',
      name: 'Milk',
      letter: 'M',
      phraseKey: 'fruit_milk',
      bubbleEmoji: '🥛',
      tagline: 'Cold & Fresh!',
      color: '#42A5F5',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<rect x="70" y="70" width="60" height="90" rx="10" fill="#E3F2FD" stroke="#90CAF9" stroke-width="3"/>' +
            '<polygon points="70,70 100,45 130,70" fill="#BBDEFB"/>' +
            '<circle cx="100" cy="110" r="16" fill="#42A5F5"/>' +
            '<circle cx="100" cy="110" r="10" fill="#FFF"/>' +
            '<path d="M 94 110 Q 100 115 106 110" stroke="#42A5F5" stroke-width="2" fill="none"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'cookie',
      name: 'Cookie',
      letter: 'C',
      phraseKey: 'fruit_cookie',
      bubbleEmoji: '🍪',
      tagline: 'Yummy Treat!',
      color: '#8D6E63',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<circle cx="100" cy="105" r="54" fill="#D7CCC8" stroke="#8D6E63" stroke-width="3"/>' +
            '<circle cx="80" cy="85" r="6" fill="#4E342E"/>' +
            '<circle cx="120" cy="85" r="6" fill="#4E342E"/>' +
            '<circle cx="75" cy="120" r="6" fill="#4E342E"/>' +
            '<circle cx="125" cy="120" r="6" fill="#4E342E"/>' +
            '<circle cx="100" cy="105" r="7" fill="#4E342E"/>' +
            '<path d="M 92 120 Q 100 128 108 120" stroke="#4E342E" stroke-width="2.5" fill="none"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'grapes',
      name: 'Grapes',
      letter: 'G',
      phraseKey: 'fruit_grapes',
      bubbleEmoji: '🍇',
      tagline: 'Sweet Purple!',
      color: '#AB47BC',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<path d="M 100 50 Q 115 35 125 45" stroke="#5D4037" stroke-width="4" fill="none"/>' +
            '<circle cx="85" cy="80" r="16" fill="#AB47BC"/>' +
            '<circle cx="115" cy="80" r="16" fill="#AB47BC"/>' +
            '<circle cx="100" cy="105" r="16" fill="#8E24AA"/>' +
            '<circle cx="75" cy="115" r="16" fill="#AB47BC"/>' +
            '<circle cx="125" cy="115" r="16" fill="#AB47BC"/>' +
            '<circle cx="90" cy="138" r="15" fill="#8E24AA"/>' +
            '<circle cx="110" cy="138" r="15" fill="#8E24AA"/>' +
            '<circle cx="100" cy="160" r="13" fill="#7B1FA2"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'corn',
      name: 'Corn',
      letter: 'C',
      phraseKey: 'fruit_corn',
      bubbleEmoji: '🌽',
      tagline: 'Golden Sweet!',
      color: '#FDD835',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<ellipse cx="100" cy="105" rx="26" ry="52" fill="#FDD835"/>' +
            '<path d="M 72 135 Q 85 100 80 75 Q 85 120 100 155 Z" fill="#66BB6A"/>' +
            '<path d="M 128 135 Q 115 100 120 75 Q 115 120 100 155 Z" fill="#66BB6A"/>' +
            '<line x1="85" y1="90" x2="115" y2="90" stroke="#F57F17" stroke-width="2"/>' +
            '<line x1="85" y1="110" x2="115" y2="110" stroke="#F57F17" stroke-width="2"/>' +
            '<line x1="88" y1="130" x2="112" y2="130" stroke="#F57F17" stroke-width="2"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'cheese',
      name: 'Cheese',
      letter: 'C',
      phraseKey: 'fruit_cheese',
      bubbleEmoji: '🧀',
      tagline: 'Cheesy Good!',
      color: '#FFA000',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<polygon points="45,130 155,130 145,70 65,70" fill="#FFD54F" stroke="#FFA000" stroke-width="3"/>' +
            '<circle cx="80" cy="100" r="10" fill="#FFCA28"/>' +
            '<circle cx="120" cy="95" r="8" fill="#FFCA28"/>' +
            '<circle cx="105" cy="115" r="6" fill="#FFCA28"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'honey',
      name: 'Honey',
      letter: 'H',
      phraseKey: 'fruit_honey',
      bubbleEmoji: '🍯',
      tagline: 'Sweet Sticky!',
      color: '#FFB300',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<ellipse cx="100" cy="65" rx="35" ry="12" fill="#FFA000"/>' +
            '<path d="M 65 65 C 55 100 55 140 100 155 C 145 140 145 100 135 65 Z" fill="#FFC107" stroke="#FFA000" stroke-width="3"/>' +
            '<rect x="75" y="95" width="50" height="22" rx="6" fill="#FFF8E1"/>' +
            '<text x="100" y="111" font-size="12" font-weight="900" fill="#E65100" text-anchor="middle">HONEY</text>' +
          '</g>' +
        '</svg>'
      )
    }
  ],

  // 🚗 3. VEHICLES THEME (8 Vehicles)
  vehicles: [
    {
      id: 'car',
      name: 'Car',
      letter: 'C',
      phraseKey: 'vehicle_car',
      bubbleEmoji: '🚗',
      tagline: 'Vroom Vroom!',
      color: '#E53935',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<path d="M 45 125 C 45 125 50 100 70 95 C 80 80 120 80 130 95 C 150 100 155 125 155 125 Z" fill="#EF5350"/>' +
            '<rect x="38" y="115" width="124" height="32" rx="10" fill="#E53935"/>' +
            '<circle cx="68" cy="148" r="18" fill="#37474F"/>' +
            '<circle cx="68" cy="148" r="8" fill="#ECEFF1"/>' +
            '<circle cx="138" cy="148" r="18" fill="#37474F"/>' +
            '<circle cx="138" cy="148" r="8" fill="#ECEFF1"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'bus',
      name: 'Bus',
      letter: 'B',
      phraseKey: 'vehicle_bus',
      bubbleEmoji: '🚌',
      tagline: 'Round & Round!',
      color: '#FDD835',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<rect x="40" y="65" width="125" height="78" rx="16" fill="#FDD835" stroke="#F57F17" stroke-width="3"/>' +
            '<rect x="52" y="78" width="24" height="24" rx="6" fill="#E1F5FE"/>' +
            '<rect x="85" y="78" width="24" height="24" rx="6" fill="#E1F5FE"/>' +
            '<rect x="118" y="78" width="34" height="28" rx="6" fill="#E1F5FE"/>' +
            '<circle cx="65" cy="145" r="16" fill="#37474F"/>' +
            '<circle cx="65" cy="145" r="7" fill="#ECEFF1"/>' +
            '<circle cx="138" cy="145" r="16" fill="#37474F"/>' +
            '<circle cx="138" cy="145" r="7" fill="#ECEFF1"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'train',
      name: 'Train',
      letter: 'T',
      phraseKey: 'vehicle_train',
      bubbleEmoji: '🚂',
      tagline: 'Choo Choo!',
      color: '#43A047',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<circle cx="70" cy="50" r="10" fill="#E0E0E0" opacity="0.8"/>' +
            '<circle cx="60" cy="35" r="14" fill="#E0E0E0" opacity="0.6"/>' +
            '<rect x="65" y="65" width="16" height="25" fill="#37474F"/>' +
            '<rect x="50" y="85" width="70" height="55" rx="10" fill="#43A047"/>' +
            '<rect x="115" y="70" width="45" height="70" rx="10" fill="#1E88E5"/>' +
            '<rect x="125" y="80" width="24" height="24" rx="4" fill="#FFF"/>' +
            '<circle cx="68" cy="145" r="14" fill="#263238"/>' +
            '<circle cx="102" cy="145" r="14" fill="#263238"/>' +
            '<circle cx="140" cy="145" r="18" fill="#263238"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'airplane',
      name: 'Airplane',
      letter: 'A',
      phraseKey: 'vehicle_airplane',
      bubbleEmoji: '✈️',
      tagline: 'High in Sky!',
      color: '#039BE5',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<ellipse cx="100" cy="100" rx="65" ry="24" fill="#E1F5FE" stroke="#0288D1" stroke-width="3"/>' +
            '<polygon points="85,95 105,45 125,95" fill="#0288D1"/>' +
            '<polygon points="85,105 105,155 125,105" fill="#0288D1"/>' +
            '<polygon points="40,95 30,70 50,95" fill="#0288D1"/>' +
            '<circle cx="135" cy="98" r="8" fill="#81D4FA"/>' +
            '<circle cx="112" cy="98" r="5" fill="#81D4FA"/>' +
            '<circle cx="95" cy="98" r="5" fill="#81D4FA"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'boat',
      name: 'Boat',
      letter: 'B',
      phraseKey: 'vehicle_boat',
      bubbleEmoji: '⛵',
      tagline: 'Sail on Water!',
      color: '#00ACC1',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<path d="M 45 125 L 155 125 L 140 155 L 60 155 Z" fill="#E53935"/>' +
            '<line x1="100" y1="60" x2="100" y2="125" stroke="#5D4037" stroke-width="4"/>' +
            '<polygon points="100,65 145,115 100,115" fill="#FFF"/>' +
            '<polygon points="95,75 60,115 95,115" fill="#81D4FA"/>' +
            '<path d="M 35 158 Q 65 150 100 158 Q 135 166 165 158" stroke="#0288D1" stroke-width="4" fill="none"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'bicycle',
      name: 'Bicycle',
      letter: 'B',
      phraseKey: 'vehicle_bicycle',
      bubbleEmoji: '🚲',
      tagline: 'Ring Ring! Pedal!',
      color: '#7CB342',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<circle cx="65" cy="135" r="28" stroke="#37474F" stroke-width="6" fill="none"/>' +
            '<circle cx="145" cy="135" r="28" stroke="#37474F" stroke-width="6" fill="none"/>' +
            '<polygon points="65,135 100,95 135,135 100,135" stroke="#E53935" stroke-width="5" fill="none"/>' +
            '<line x1="100" y1="95" x2="140" y2="90" stroke="#E53935" stroke-width="5"/>' +
            '<line x1="90" y1="90" x2="110" y2="90" stroke="#37474F" stroke-width="6"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'firetruck',
      name: 'Fire Truck',
      letter: 'F',
      phraseKey: 'vehicle_firetruck',
      bubbleEmoji: '🚒',
      tagline: 'Wee-Woo Brave!',
      color: '#D32F2F',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<rect x="40" y="80" width="120" height="60" rx="8" fill="#D32F2F"/>' +
            '<rect x="120" y="90" width="30" height="24" rx="4" fill="#E1F5FE"/>' +
            '<circle cx="135" cy="72" r="8" fill="#29B6F6"/>' +
            '<line x1="50" y1="75" x2="110" y2="75" stroke="#B0BEC5" stroke-width="6"/>' +
            '<circle cx="68" cy="142" r="16" fill="#263238"/>' +
            '<circle cx="132" cy="142" r="16" fill="#263238"/>' +
          '</g>' +
        '</svg>'
      )
    },
    {
      id: 'helicopter',
      name: 'Helicopter',
      letter: 'H',
      phraseKey: 'vehicle_helicopter',
      bubbleEmoji: '🚁',
      tagline: 'Chop Chop High!',
      color: '#FFB300',
      svg: (
        '<svg viewBox="0 0 200 200" class="animal-svg">' +
          '<g class="anim-body-group">' +
            '<line x1="40" y1="65" x2="130" y2="65" stroke="#37474F" stroke-width="5"/>' +
            '<line x1="85" y1="65" x2="85" y2="80" stroke="#37474F" stroke-width="4"/>' +
            '<ellipse cx="85" cy="105" rx="45" ry="28" fill="#FFC107"/>' +
            '<ellipse cx="108" cy="100" rx="16" ry="14" fill="#E1F5FE"/>' +
            '<rect x="35" y="100" width="45" height="12" fill="#FFA000"/>' +
            '<line x1="60" y1="145" x2="110" y2="145" stroke="#37474F" stroke-width="5"/>' +
            '<line x1="70" y1="133" x2="70" y2="145" stroke="#37474F" stroke-width="4"/>' +
            '<line x1="100" y1="133" x2="100" y2="145" stroke="#37474F" stroke-width="4"/>' +
          '</g>' +
        '</svg>'
      )
    }
  ],

  // 🎨 4. COLORS THEME (10 Bright Colors)
  colors: [
    { id: 'red', name: 'Red', letter: 'R', phraseKey: 'color_red', bubbleEmoji: '❤️', hex: '#E53935' },
    { id: 'blue', name: 'Blue', letter: 'B', phraseKey: 'color_blue', bubbleEmoji: '💙', hex: '#1E88E5' },
    { id: 'yellow', name: 'Yellow', letter: 'Y', phraseKey: 'color_yellow', bubbleEmoji: '💛', hex: '#FDD835' },
    { id: 'green', name: 'Green', letter: 'G', phraseKey: 'color_green', bubbleEmoji: '💚', hex: '#43A047' },
    { id: 'purple', name: 'Purple', letter: 'P', phraseKey: 'color_purple', bubbleEmoji: '💜', hex: '#8E24AA' },
    { id: 'pink', name: 'Pink', letter: 'P', phraseKey: 'color_pink', bubbleEmoji: '💖', hex: '#EC407A' },
    { id: 'orange', name: 'Orange', letter: 'O', phraseKey: 'color_orange', bubbleEmoji: '🧡', hex: '#FF9800' },
    { id: 'brown', name: 'Brown', letter: 'B', phraseKey: 'color_brown', bubbleEmoji: '🤎', hex: '#795548' },
    { id: 'white', name: 'White', letter: 'W', phraseKey: 'color_white', bubbleEmoji: '🤍', hex: '#ECEFF1' },
    { id: 'black', name: 'Black', letter: 'B', phraseKey: 'color_black', bubbleEmoji: '🖤', hex: '#263238' }
  ],

  // 🎵 5. SONGS THEME (6 Classic Nursery Rhymes)
  songs: [
    { id: 'twinkle', title: 'Twinkle Twinkle Little Star', icon: '⭐', phraseKey: 'song_twinkle', color: '#FFD54F' },
    { id: 'abc', title: 'The ABC Alphabet Song', icon: '🔤', phraseKey: 'song_abc', color: '#42A5F5' },
    { id: 'macdonald', title: 'Old MacDonald Had a Farm', icon: '🚜', phraseKey: 'song_macdonald', color: '#66BB6A' },
    { id: 'row', title: 'Row, Row, Row Your Boat', icon: '🚣', phraseKey: 'song_row', color: '#29B6F6' },
    { id: 'wheels', title: 'The Wheels on the Bus', icon: '🚌', phraseKey: 'song_wheels', color: '#FFA726' },
    { id: 'happy', title: "If You're Happy & You Know It", icon: '👏', phraseKey: 'song_happy', color: '#EC407A' }
  ],

  // 🍼 6. EXPANDED FEED FRIENDS (8 Hungry Animals & Dynamic Food Basket)
  feedFriends: [
    { id: 'monkey', name: 'Milo the Monkey', askClip: 'feed_monkey_ask', targetFood: 'banana', prompt: 'Milo wants a yellow banana! 🍌', emoji: '🐒' },
    { id: 'bear', name: 'Barnaby the Bear', askClip: 'feed_bear_ask', targetFood: 'honey', prompt: 'Barnaby wants sweet honey! 🍯', emoji: '🐻' },
    { id: 'rabbit', name: 'Bunny the Rabbit', askClip: 'feed_rabbit_ask', targetFood: 'carrot', prompt: 'Bunny wants a crunchy carrot! 🥕', emoji: '🐰' },
    { id: 'cat', name: 'Cleo the Cat', askClip: 'feed_cat_ask', targetFood: 'fish', prompt: 'Cleo wants a tasty fish! 🐟', emoji: '🐱' },
    { id: 'dog', name: 'Buster the Dog', askClip: 'feed_dog_ask', targetFood: 'bone', prompt: 'Buster wants a crunchy bone! 🦴', emoji: '🐶' },
    { id: 'panda', name: 'Panpan the Panda', askClip: 'feed_panda_ask', targetFood: 'bamboo', prompt: 'Panpan wants green bamboo! 🎋', emoji: '🐼' },
    { id: 'elephant', name: 'Ellie the Elephant', askClip: 'feed_elephant_ask', targetFood: 'watermelon', prompt: 'Ellie wants juicy watermelon! 🍉', emoji: '🐘' },
    { id: 'duck', name: 'Ducky the Duck', askClip: 'feed_duck_ask', targetFood: 'corn', prompt: 'Ducky wants sweet golden corn! 🌽', emoji: '🦆' }
  ],

  // All Foods available in the Food Basket
  allFoods: [
    { id: 'banana', name: 'Banana', emoji: '🍌' },
    { id: 'honey', name: 'Honey', emoji: '🍯' },
    { id: 'carrot', name: 'Carrot', emoji: '🥕' },
    { id: 'fish', name: 'Fish', emoji: '🐟' },
    { id: 'bone', name: 'Bone', emoji: '🦴' },
    { id: 'bamboo', name: 'Bamboo', emoji: '🎋' },
    { id: 'watermelon', name: 'Watermelon', emoji: '🍉' },
    { id: 'corn', name: 'Corn', emoji: '🌽' },
    { id: 'apple', name: 'Apple', emoji: '🍎' },
    { id: 'milk', name: 'Milk', emoji: '🥛' },
    { id: 'cookie', name: 'Cookie', emoji: '🍪' },
    { id: 'cheese', name: 'Cheese', emoji: '🧀' }
  ]
};

// Backward-compatible alias for v3 test pages
var ContentDataV3 = ContentData;
