/**
 * holy crap I don't know if this was worth it
 * thanks to everyone's hard work on
 * https://docs.google.com/spreadsheets/d/17F5DN0Jld9nfHcblc5-Y8-V47r686hdbsRxCHFdp4rs/edit#gid=1899088336
 */
export const LATTE_EFFECTS_MAP = {
  "Moxie Default": /(Cinna-|cinnamon|with a shake of cinnamon)/im,
  "Mus Default": /(Vanilla|vanilla|with a shot of vanilla)/im,
  "Myst Default": /(Autumnal|pumpkin spice|with a hint of autumn)/im,
  "+10% chance of Critical Hit": /(Extra-salty|rock salt|with rock salt)/im,
  "+15% chance of Critical Hit": /(MSG-Laced|MSG|with flavor)/im,
  "+20 Sleaze Damage": /(Motor oil and|motor oil|with motor oil)/im,
  "+20 Spooky Damage": /(Moldy|grave mold|with grave mold)/im,
  "+20% Item Drops": /(Carrot|carrot|with carrot)/im,
  "+25 Cold Damage": /(Blue chalk and|blue chalk|with blue chalk)/im,
  "+25 Hot Damage": /(Coal-boiled|coal|with a lump of hot coal)/im,
  "+25 Sleaze Damage (greek)": /(Greek spice|greek spice|with greek spice)/im,
  "+25 Sleaze Damage (grobold)":
    /(Grobold rum and|grobold rum|with a shot of grobold rum)/im,
  "+25 Spooky Damage": /(Lihc-licked|lihc saliva|with lihc spit)/im,
  "+25 Spooky & Weapon Damage": /(Teeth|teeth|with teeth in it)/im,
  "+25 Stench Damage": /(Kombucha-infused|kombucha|with a kombucha chaser)/im,
  "+25% Combat Initiative":
    /(Dyspepsi-flavored|Dyspepsi|with a shot of Dyspepsi syrup)/im,
  "+3 Familiar Experience Per Combat":
    /(Fortified|vitamin|enriched with vitamins)/im,
  "+3 Stats Per Fight": /(Fresh grass and|fresh grass|with fresh-cut grass)/im,
  "+4 Adventure(s) per day": /(Guarna and|guarna|infused with guarna)/im,
  "+40% Meat": /(Cajun|cajun spice|with cajun spice)/im,
  "+5 Prismatic Damage": /(Oil-paint and|oil paint|with oil paint)/im,
  "+5 to Familiar Weight": /(Rawhide|rawhide|with rawhide)/im,
  "+5% chance of Critical Hit": /(Salted|salt|with salt)/im,
  "+50 Spooky Damage":
    /(Ancient exotic spiced|ancient\/spicy|with ancient spice)/im,
  "+50% Combat Initiative": /(Diet|diet soda|with diet soda syrup)/im,
  "+6 PvP Fight(s) per day": /(Hellish|hellion|with hellion)/im,
  "+50 Damage Absorption": /(Hobo-spiced|hobo spice|with hobo spice)/im,
  "Damage Reduction: 20": /(Filthy|filth milk|with filth milk)/im,
  "+20 Maximum HP": /(Carb-loaded|macaroni|with extra noodles)/im,
  "+200% Maximum HP": /(Norwhal milk and|norwhal milk|with norwhal milk)/im,
  "+30 Maximum MP": /(Fungal|fungus|with fungal scrapings)/im,
  "-10% Combat Frequency": /(Inky|ink|with ink)/im,
  "+10% Combat Frequency": /(Hot wing and|hot wing|with a hot wing in it)/im,
  "Moxie +50%": /(Super-greasy|mega sausage|with super gristle)/im,
  "Muscle +10, Moxie +10, Mysticality +10":
    /(Space pumpkin and|space pumpkin|with space pumpkin juice)/im,
  "Muscle +20, Moxie +20, Mysticality +20":
    /(Paradise milk|paradise milk|with milk of paradise)/im,
  "Muscle +20%, Mysticality +20%, Moxie +20%":
    /(Belgian vanilla|Belgian vanilla|with a shot of Belgian vanilla)/im,
  "Muscle +30": /(Dwarf creamed|dwarf cream|with dwarf cream)/im,
  "Muscle +5, Moxie +5, Mysticality +5":
    /(Sandalwood-infused|sandalwood splinter|with sandalwood splinters)/im,
  "Muscle +50%": /(Extra-greasy|hot sausage|with extra gristle)/im,
  "Mysticality +20": /(Bug-thistle|bug-thistle|with a sprig of bug-thistle)/im,
  "Mysticality +50%": /(Greasy|sausage|with gristle)/im,
  "10-20 HP Regen":
    /(Extra-healthy|health potion|with a shot of healing elixir )/im,
  "4-6 MP Regen": /(Carrrdamom-scented|carrrdamom|with carrrdamom)/im,
  "5 HP Regen": /(Basil and|bandit|with basil)/im,
  "5-15 MP Regen": /(Lizard milk and|lizard milk|lizard milk)/im,
  "+3 Cold Resistance": /(Cocoa|cocoa powder|mocha loca)/im,
  "+3 Hot Resistance": /(Chili|chili seeds|with a kick)/im,
  "+3 Sleaze Resistance": /(Floured|white flour dusted|flour)/im,
  "+3 Spooky Resistance": /(Cloven|cloves|with a puff of cloves)/im,
  "+3 Stench Resistance": /(Squamous-salted|squamous|with squamous salt)/im,
  "Spell Damage +10": /(Butternutty|butternut-spice|with a puff of cloves)/im,
  "Spell Damage +20":
    /(Spaghetti-squashy|spaghetti squash spice|with butternut)/im,
  "Weapon Damage +25": /(Envenomed|asp venom|with extra squash)/im,
  "Weapon Damage +50":
    /(Gunpowder|and gunpowder|with gunpowder extra poison)/im,
};

export const LATTE_EFFECTS_LIST = Object.keys(LATTE_EFFECTS_MAP);
