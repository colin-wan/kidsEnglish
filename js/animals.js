/**
 * Animal Characters Definition & Vector SVG Illustrations
 * Khan Academy Kids & Sago Mini style for toddlers (2-3 years old)
 * Big cute eyes, friendly smiles, high contrast, warm colors
 * Compatible with iOS 12.5.8 Safari
 */

var AnimalsData = [
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
    subtitle: 'L is for Lion',
    tagline: 'Roar! Roar!',
    color: '#FFB300',
    svg: (
      '<svg viewBox="0 0 200 200" class="animal-svg lion-svg">' +
        '<g class="anim-body-group">' +
          '<!-- Big Soft Mane -->' +
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
          '<!-- Ears -->' +
          '<circle cx="58" cy="62" r="18" fill="#F57C00"/>' +
          '<circle cx="58" cy="62" r="11" fill="#FFCCBC"/>' +
          '<circle cx="142" cy="62" r="18" fill="#F57C00"/>' +
          '<circle cx="142" cy="62" r="11" fill="#FFCCBC"/>' +
          '<!-- Golden Head -->' +
          '<circle cx="100" cy="106" r="52" fill="#FFD54F"/>' +
          '<!-- Rosy Cheeks -->' +
          '<circle cx="68" cy="116" r="10" fill="#FF8A80" opacity="0.6"/>' +
          '<circle cx="132" cy="116" r="10" fill="#FF8A80" opacity="0.6"/>' +
          '<!-- Big Bright Eyes -->' +
          '<g class="anim-eyes">' +
            '<ellipse cx="76" cy="98" rx="8" ry="11" fill="#263238"/>' +
            '<circle cx="78" cy="94" r="3.5" fill="#FFFFFF"/>' +
            '<ellipse cx="124" cy="98" rx="8" ry="11" fill="#263238"/>' +
            '<circle cx="126" cy="94" r="3.5" fill="#FFFFFF"/>' +
          '</g>' +
          '<!-- Cute Muzzle & Nose -->' +
          '<ellipse cx="100" cy="120" rx="20" ry="14" fill="#FFF9C4"/>' +
          '<path d="M 90 114 Q 100 110 110 114 Q 100 126 90 114 Z" fill="#795548"/>' +
          '<path d="M 100 122 L 100 128 M 92 128 Q 100 135 108 128" stroke="#5D4037" stroke-width="2.5" stroke-linecap="round" fill="none"/>' +
          '<!-- Tiny Crown -->' +
          '<path class="anim-crown" d="M 85 58 L 92 68 L 100 52 L 108 68 L 115 58 L 110 74 L 90 74 Z" fill="#FFEB3B" stroke="#FFA000" stroke-width="1.8"/>' +
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
    subtitle: 'E is for Elephant',
    tagline: 'Pawoo! Splash!',
    color: '#42A5F5',
    svg: (
      '<svg viewBox="0 0 200 200" class="animal-svg elephant-svg">' +
        '<g class="anim-body-group">' +
          '<!-- Big Flappy Ears -->' +
          '<ellipse class="anim-ear-left" cx="46" cy="98" rx="34" ry="44" fill="#90CAF9" transform="rotate(-15 46 98)"/>' +
          '<ellipse cx="48" cy="100" rx="22" ry="30" fill="#F8BBD0" opacity="0.6"/>' +
          '<ellipse class="anim-ear-right" cx="154" cy="98" rx="34" ry="44" fill="#90CAF9" transform="rotate(15 154 98)"/>' +
          '<ellipse cx="152" cy="100" rx="22" ry="30" fill="#F8BBD0" opacity="0.6"/>' +
          '<!-- Chubby Head -->' +
          '<circle cx="100" cy="102" r="50" fill="#64B5F6"/>' +
          '<!-- Rosy Cheeks -->' +
          '<circle cx="70" cy="114" r="10" fill="#FF8A80" opacity="0.55"/>' +
          '<circle cx="130" cy="114" r="10" fill="#FF8A80" opacity="0.55"/>' +
          '<!-- Eyes -->' +
          '<g class="anim-eyes">' +
            '<ellipse cx="78" cy="94" rx="8" ry="11" fill="#263238"/>' +
            '<circle cx="80" cy="90" r="3.5" fill="#FFFFFF"/>' +
            '<ellipse cx="122" cy="94" rx="8" ry="11" fill="#263238"/>' +
            '<circle cx="124" cy="90" r="3.5" fill="#FFFFFF"/>' +
          '</g>' +
          '<!-- Curled Playful Trunk -->' +
          '<path class="anim-trunk" d="M 94 112 Q 100 135 106 142 Q 116 150 126 138 Q 132 126 122 120" fill="none" stroke="#64B5F6" stroke-width="15" stroke-linecap="round"/>' +
          '<!-- Water bubble specks -->' +
          '<circle class="anim-waterdrop-1" cx="128" cy="106" r="5" fill="#80D8FF"/>' +
          '<circle class="anim-waterdrop-2" cx="136" cy="96" r="3.5" fill="#B3E5FC"/>' +
          '<!-- Cute little tuft -->' +
          '<path d="M 97 53 Q 100 44 102 53 M 102 52 Q 105 46 106 54" stroke="#42A5F5" stroke-width="2.5" fill="none"/>' +
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
    subtitle: 'M is for Monkey',
    tagline: 'Ooh ooh aah aah!',
    color: '#8D6E63',
    svg: (
      '<svg viewBox="0 0 200 200" class="animal-svg monkey-svg">' +
        '<g class="anim-body-group">' +
          '<!-- Big Round Ears -->' +
          '<circle cx="44" cy="95" r="24" fill="#795548"/>' +
          '<circle cx="44" cy="95" r="14" fill="#FFCCBC"/>' +
          '<circle cx="156" cy="95" r="24" fill="#795548"/>' +
          '<circle cx="156" cy="95" r="14" fill="#FFCCBC"/>' +
          '<!-- Head -->' +
          '<circle cx="100" cy="102" r="50" fill="#8D6E63"/>' +
          '<!-- Heart Muzzle Face Area -->' +
          '<path d="M 100 80 C 82 62 62 80 66 102 C 68 122 88 134 100 136 C 112 134 132 122 134 102 C 138 80 118 62 100 80 Z" fill="#FFE0B2"/>' +
          '<!-- Rosy Cheeks -->' +
          '<circle cx="74" cy="112" r="8" fill="#FF8A80" opacity="0.6"/>' +
          '<circle cx="126" cy="112" r="8" fill="#FF8A80" opacity="0.6"/>' +
          '<!-- Eyes -->' +
          '<g class="anim-eyes">' +
            '<ellipse cx="84" cy="92" rx="7" ry="10" fill="#263238"/>' +
            '<circle cx="86" cy="89" r="3" fill="#FFFFFF"/>' +
            '<ellipse cx="116" cy="92" rx="7" ry="10" fill="#263238"/>' +
            '<circle cx="118" cy="89" r="3" fill="#FFFFFF"/>' +
          '</g>' +
          '<!-- Smiling Mouth & Nose -->' +
          '<circle cx="96" cy="108" r="2" fill="#5D4037"/>' +
          '<circle cx="104" cy="108" r="2" fill="#5D4037"/>' +
          '<path d="M 88 116 Q 100 128 112 116" stroke="#5D4037" stroke-width="3" stroke-linecap="round" fill="none"/>' +
          '<!-- Banana Hand -->' +
          '<g class="anim-banana" transform="translate(130, 115) rotate(20)">' +
            '<path d="M 0 0 Q 15 -5 20 18 Q 12 10 0 0 Z" fill="#FFEB3B" stroke="#FBC02D" stroke-width="1.5"/>' +
          '</g>' +
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
    subtitle: 'D is for Duck',
    tagline: 'Quack! Quack!',
    color: '#FFCA28',
    svg: (
      '<svg viewBox="0 0 200 200" class="animal-svg duck-svg">' +
        '<g class="anim-body-group">' +
          '<!-- Water ripples below -->' +
          '<ellipse cx="100" cy="162" rx="65" ry="12" fill="#80D8FF" opacity="0.5"/>' +
          '<path d="M 50 162 Q 75 168 100 162 Q 125 156 150 162" stroke="#40C4FF" stroke-width="3" fill="none" opacity="0.7"/>' +
          '<!-- Duck Body -->' +
          '<ellipse cx="100" cy="115" rx="52" ry="44" fill="#FFEE58"/>' +
          '<!-- Wing -->' +
          '<path class="anim-wing" d="M 72 110 C 60 120 70 140 92 136 C 85 125 80 115 72 110 Z" fill="#FDD835"/>' +
          '<!-- Cheeks -->' +
          '<circle cx="80" cy="106" r="9" fill="#FF8A80" opacity="0.6"/>' +
          '<!-- Eye -->' +
          '<g class="anim-eyes">' +
            '<ellipse cx="88" cy="94" rx="8" ry="11" fill="#263238"/>' +
            '<circle cx="90" cy="90" r="3.5" fill="#FFFFFF"/>' +
          '</g>' +
          '<!-- Cute Beak -->' +
          '<path class="anim-beak" d="M 112 95 Q 146 95 142 108 Q 130 116 112 112 Z" fill="#FF7043" stroke="#F4511E" stroke-width="1.5"/>' +
          '<!-- Top Feather Tuft -->' +
          '<path d="M 98 72 Q 102 60 108 72 M 106 70 Q 112 62 114 74" stroke="#FDD835" stroke-width="3" stroke-linecap="round" fill="none"/>' +
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
    subtitle: 'F is for Frog',
    tagline: 'Ribbit! Ribbit!',
    color: '#66BB6A',
    svg: (
      '<svg viewBox="0 0 200 200" class="animal-svg frog-svg">' +
        '<g class="anim-body-group">' +
          '<!-- Big Water Lily Pad -->' +
          '<ellipse cx="100" cy="160" rx="78" ry="18" fill="#388E3C" opacity="0.75"/>' +
          '<path d="M 100 160 L 160 148" stroke="#2E7D32" stroke-width="3"/>' +
          '<!-- Frog Eyeballs Base -->' +
          '<circle cx="68" cy="74" r="22" fill="#66BB6A"/>' +
          '<circle cx="132" cy="74" r="22" fill="#66BB6A"/>' +
          '<!-- Big Head Body -->' +
          '<ellipse cx="100" cy="115" rx="60" ry="46" fill="#81C784"/>' +
          '<!-- Tummy Patch -->' +
          '<ellipse cx="100" cy="126" rx="36" ry="26" fill="#DCEDC8"/>' +
          '<!-- Eyes with Highlights -->' +
          '<g class="anim-eyes">' +
            '<ellipse cx="68" cy="74" rx="14" ry="15" fill="#FFFFFF"/>' +
            '<ellipse cx="68" cy="74" rx="8" ry="10" fill="#263238"/>' +
            '<circle cx="71" cy="70" r="3" fill="#FFFFFF"/>' +
            '<ellipse cx="132" cy="74" rx="14" ry="15" fill="#FFFFFF"/>' +
            '<ellipse cx="132" cy="74" rx="8" ry="10" fill="#263238"/>' +
            '<circle cx="135" cy="70" r="3" fill="#FFFFFF"/>' +
          '</g>' +
          '<!-- Rosy Cheeks -->' +
          '<circle cx="58" cy="118" r="9" fill="#FF8A80" opacity="0.6"/>' +
          '<circle cx="142" cy="118" r="9" fill="#FF8A80" opacity="0.6"/>' +
          '<!-- Wide Frog Smile -->' +
          '<path d="M 64 116 Q 100 142 136 116" stroke="#2E7D32" stroke-width="3.5" stroke-linecap="round" fill="none"/>' +
          '<!-- Tiny cute nostril dots -->' +
          '<circle cx="94" cy="106" r="2" fill="#388E3C"/>' +
          '<circle cx="106" cy="106" r="2" fill="#388E3C"/>' +
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
    subtitle: 'B is for Bear',
    tagline: 'Warm Big Hug!',
    color: '#A1887F',
    svg: (
      '<svg viewBox="0 0 200 200" class="animal-svg bear-svg">' +
        '<g class="anim-body-group">' +
          '<!-- Round Ears -->' +
          '<circle cx="54" cy="62" r="20" fill="#8D6E63"/>' +
          '<circle cx="54" cy="62" r="11" fill="#FFCCBC"/>' +
          '<circle cx="146" cy="62" r="20" fill="#8D6E63"/>' +
          '<circle cx="146" cy="62" r="11" fill="#FFCCBC"/>' +
          '<!-- Big Teddy Head -->' +
          '<circle cx="100" cy="106" r="54" fill="#A1887F"/>' +
          '<!-- Rosy Cheeks -->' +
          '<circle cx="68" cy="118" r="10" fill="#FF8A80" opacity="0.6"/>' +
          '<circle cx="132" cy="118" r="10" fill="#FF8A80" opacity="0.6"/>' +
          '<!-- Gentle Eyes -->' +
          '<g class="anim-eyes">' +
            '<ellipse cx="78" cy="96" rx="7" ry="10" fill="#263238"/>' +
            '<circle cx="80" cy="92" r="3" fill="#FFFFFF"/>' +
            '<ellipse cx="122" cy="96" rx="7" ry="10" fill="#263238"/>' +
            '<circle cx="124" cy="92" r="3" fill="#FFFFFF"/>' +
          '</g>' +
          '<!-- Cream Muzzle -->' +
          '<ellipse cx="100" cy="122" rx="24" ry="18" fill="#D7CCC8"/>' +
          '<ellipse cx="100" cy="115" rx="10" ry="7" fill="#4E342E"/>' +
          '<path d="M 100 122 L 100 128 M 92 128 Q 100 134 108 128" stroke="#4E342E" stroke-width="2.5" stroke-linecap="round" fill="none"/>' +
          '<!-- Waving Paw -->' +
          '<g class="anim-paw" transform="translate(138, 125)">' +
            '<circle cx="10" cy="10" r="14" fill="#8D6E63"/>' +
            '<circle cx="10" cy="10" r="8" fill="#FFCCBC"/>' +
          '</g>' +
        '</g>' +
      '</svg>'
    )
  }
];
